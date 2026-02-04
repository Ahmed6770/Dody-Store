(function () {
  const API_BASE = window.DODY_API_BASE || "api";
  const BACKEND_MODE = window.DODY_BACKEND || "auto";
  const SUPA_CONFIG = window.DODY_SUPABASE || {};

  const buildUrl = (path) => `${API_BASE}/${path}`;

  const safeJson = async (response) => {
    try {
      return await response.json();
    } catch (error) {
      return null;
    }
  };

  const postJson = async (path, payload) => {
    const response = await fetch(buildUrl(path), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload || {})
    });
    const data = await safeJson(response);
    if (!response.ok) {
      const message = data?.error || "request_failed";
      throw new Error(message);
    }
    return data;
  };

  const getJson = async (path) => {
    const response = await fetch(buildUrl(path), {
      method: "GET",
      cache: "no-store",
      credentials: "include"
    });
    const data = await safeJson(response);
    if (!response.ok) {
      const message = data?.error || "request_failed";
      throw new Error(message);
    }
    return data;
  };

  const phpAdapter = {
    ping: async () => {
      try {
        await getJson("store.php");
        return true;
      } catch (error) {
        return false;
      }
    },
    fetchStoreData: async () => {
      try {
        const data = await getJson("store.php");
        return data?.data || null;
      } catch (error) {
        return null;
      }
    },
    saveStoreData: async (storeData) => {
      try {
        await postJson("store.php", { data: storeData });
        return true;
      } catch (error) {
        return false;
      }
    },
    login: async (pin) => {
      try {
        const data = await postJson("login.php", { pin });
        return !!data?.authed;
      } catch (error) {
        return false;
      }
    },
    checkAuth: async () => {
      try {
        const data = await getJson("login.php");
        return !!data?.authed;
      } catch (error) {
        return false;
      }
    },
    logout: async () => {
      try {
        await postJson("logout.php", {});
        return true;
      } catch (error) {
        return false;
      }
    },
    updatePin: async (pin) => {
      try {
        await postJson("pin.php", { pin });
        return true;
      } catch (error) {
        return false;
      }
    },
    fetchOrders: async () => {
      try {
        const data = await getJson("orders.php");
        return Array.isArray(data?.orders) ? data.orders : [];
      } catch (error) {
        return null;
      }
    },
    createOrder: async (orderPayload) => {
      try {
        const data = await postJson("orders.php", orderPayload);
        return data?.order || null;
      } catch (error) {
        return null;
      }
    },
    clearOrders: async () => {
      try {
        await postJson("orders.php", { action: "clear" });
        return true;
      } catch (error) {
        return false;
      }
    },
    updateOrder: async (id, patch) => {
      try {
        const data = await postJson("order.php", { id, ...patch });
        return data?.order || null;
      } catch (error) {
        return null;
      }
    },
    deleteOrder: async (id) => {
      try {
        await postJson("order.php", { id, action: "delete" });
        return true;
      } catch (error) {
        return false;
      }
    }
  };

  const createSupabaseAdapter = () => {
    if (!window.supabase || !SUPA_CONFIG?.url || !SUPA_CONFIG?.anonKey) {
      return null;
    }
    const client = window.supabase.createClient(SUPA_CONFIG.url, SUPA_CONFIG.anonKey);

    const ensureId = () =>
      `DS-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;

    const mapOrderRow = (row) => ({
      id: row.id,
      date: row.date,
      name: row.name,
      phone: row.phone,
      address: row.address,
      notes: row.notes,
      total: Number(row.total || 0),
      status: row.status || "new",
      shippingStatus: row.shipping_status || "pending",
      deliveryFee: Number(row.delivery_fee || 0),
      items: row.items || [],
      meta: row.meta || {}
    });

    return {
      fetchStoreData: async () => {
        const { data, error } = await client
          .from("store_data")
          .select("data")
          .eq("id", 1)
          .single();
        if (error) {
          return null;
        }
        return data?.data || null;
      },
      saveStoreData: async (storeData) => {
        const { error } = await client.from("store_data").upsert({
          id: 1,
          data: storeData
        });
        return !error;
      },
      login: async (pin) => {
        if (!pin) {
          return false;
        }
        if (!SUPA_CONFIG?.adminPin) {
          return false;
        }
        const ok = pin === String(SUPA_CONFIG.adminPin);
        if (ok) {
          localStorage.setItem("dodyAdminAuth", "true");
        }
        return ok;
      },
      checkAuth: async () => {
        return localStorage.getItem("dodyAdminAuth") === "true";
      },
      logout: async () => {
        localStorage.removeItem("dodyAdminAuth");
        return true;
      },
      updatePin: async (pin) => {
        if (!pin) {
          return false;
        }
        SUPA_CONFIG.adminPin = String(pin);
        localStorage.setItem("dodySupabasePin", String(pin));
        return true;
      },
      fetchOrders: async () => {
        const { data, error } = await client
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) {
          return null;
        }
        return (data || []).map(mapOrderRow);
      },
      createOrder: async (orderPayload) => {
        const orderId = ensureId();
        const nowIso = new Date().toISOString();
        const record = {
          id: orderId,
          date: nowIso,
          name: orderPayload.name || "",
          phone: orderPayload.phone || "",
          address: orderPayload.address || "",
          notes: orderPayload.notes || "",
          total: (orderPayload.items || []).reduce(
            (sum, item) => sum + (Number(item.price) || 0) * (Number(item.qty) || 1),
            0
          ),
          status: "new",
          shipping_status: "pending",
          delivery_fee: 0,
          items: orderPayload.items || [],
          meta: { lang: orderPayload.lang || "ar" }
        };
        const { error } = await client.from("orders").insert(record);
        if (error) {
          return null;
        }
        return mapOrderRow(record);
      },
      clearOrders: async () => {
        const { error } = await client.from("orders").delete().neq("id", "");
        return !error;
      },
      updateOrder: async (id, patch) => {
        const payload = {};
        if (patch.status) payload.status = patch.status;
        if (patch.shippingStatus) payload.shipping_status = patch.shippingStatus;
        if (patch.deliveryFee !== undefined) payload.delivery_fee = patch.deliveryFee;
        const { data, error } = await client
          .from("orders")
          .update(payload)
          .eq("id", id)
          .select("*")
          .single();
        if (error) {
          return null;
        }
        return mapOrderRow(data);
      },
      deleteOrder: async (id) => {
        const { error } = await client.from("orders").delete().eq("id", id);
        return !error;
      }
    };
  };

  let activeAdapter = phpAdapter;

  const pickAdapter = async () => {
    if (BACKEND_MODE === "php") {
      activeAdapter = phpAdapter;
      return;
    }
    const supaAdapter = createSupabaseAdapter();
    if (BACKEND_MODE === "supabase") {
      activeAdapter = supaAdapter || phpAdapter;
      return;
    }
    // auto
    const phpOk = await phpAdapter.ping();
    if (phpOk) {
      activeAdapter = phpAdapter;
      return;
    }
    activeAdapter = supaAdapter || phpAdapter;
  };

  const proxy = async (fn, ...args) => {
    if (!activeAdapter) {
      await pickAdapter();
    }
    return activeAdapter[fn](...args);
  };

  window.DodyApi = {
    fetchStoreData: (...args) => proxy("fetchStoreData", ...args),
    saveStoreData: (...args) => proxy("saveStoreData", ...args),
    login: (...args) => proxy("login", ...args),
    logout: (...args) => proxy("logout", ...args),
    checkAuth: (...args) => proxy("checkAuth", ...args),
    updatePin: (...args) => proxy("updatePin", ...args),
    fetchOrders: (...args) => proxy("fetchOrders", ...args),
    createOrder: (...args) => proxy("createOrder", ...args),
    clearOrders: (...args) => proxy("clearOrders", ...args),
    updateOrder: (...args) => proxy("updateOrder", ...args),
    deleteOrder: (...args) => proxy("deleteOrder", ...args)
  };

  pickAdapter();
})();
