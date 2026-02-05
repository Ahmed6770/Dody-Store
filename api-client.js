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
    getTelegramSettings: async () => {
      try {
        const data = await getJson("telegram.php");
        return data || null;
      } catch (error) {
        return null;
      }
    },
    saveTelegramSettings: async (payload) => {
      try {
        await postJson("telegram.php", payload || {});
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

    const getNextOrderId = async () => {
      const baseSeq = 10000;
      try {
        const { data, error } = await client
          .from("store_data")
          .select("data")
          .eq("id", 1)
          .single();
        if (!error && data?.data && typeof data.data === "object") {
          const currentSeq = Number(data.data.orderSeq || baseSeq);
          const safeSeq = Number.isFinite(currentSeq) && currentSeq >= baseSeq ? currentSeq : baseSeq;
          const nextSeq = safeSeq + 1;
          const updatedData = { ...data.data, orderSeq: nextSeq };
          const { error: saveError } = await client.from("store_data").upsert({
            id: 1,
            data: updatedData
          });
          if (!saveError) {
            return `DS-${nextSeq}`;
          }
        }
      } catch (error) {
        // ignore
      }

      try {
        const { data, error } = await client
          .from("orders")
          .select("id")
          .order("date", { ascending: false })
          .limit(1);
        if (!error && Array.isArray(data) && data.length > 0) {
          const lastId = String(data[0]?.id || "");
          const match = lastId.match(/DS-(\d+)/);
          if (match) {
            return `DS-${Number(match[1]) + 1}`;
          }
        }
      } catch (error) {
        // ignore
      }

      return `DS-${baseSeq + Math.floor(Date.now() / 1000)}`;
    };

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
          console.warn("Supabase store_data fetch error", error);
          return null;
        }
        return data?.data || null;
      },
      saveStoreData: async (storeData) => {
        let payload = storeData;
        const hasSeq = Number.isFinite(Number(storeData?.orderSeq));
        if (!hasSeq) {
          try {
            const { data } = await client.from("store_data").select("data").eq("id", 1).single();
            const existingSeq = data?.data?.orderSeq;
            if (Number.isFinite(Number(existingSeq))) {
              payload = { ...storeData, orderSeq: existingSeq };
            }
          } catch (error) {
            // ignore
          }
        }
        const { error } = await client.from("store_data").upsert({
          id: 1,
          data: payload
        });
        if (error) {
          console.warn("Supabase store_data save error", error);
        }
        return !error;
      },
      login: async (email, password) => {
        if (!email || !password) {
          return false;
        }
        const { error } = await client.auth.signInWithPassword({ email, password });
        if (error) {
          console.warn("Supabase login error", error);
          return false;
        }
        return true;
      },
      checkAuth: async () => {
        const { data, error } = await client.auth.getSession();
        if (error) {
          return false;
        }
        return !!data?.session;
      },
      logout: async () => {
        const { error } = await client.auth.signOut();
        return !error;
      },
      updatePin: async () => {
        return false;
      },
      getTelegramSettings: async () => {
        return null;
      },
      saveTelegramSettings: async () => {
        return true;
      },
      fetchOrders: async () => {
        const { data, error } = await client
          .from("orders")
          .select("*")
          .order("date", { ascending: false });
        if (error) {
          console.warn("Supabase orders fetch error", error);
          return null;
        }
        return (data || []).map(mapOrderRow);
      },
      createOrder: async (orderPayload) => {
        const orderId = await getNextOrderId();
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
          console.warn("Supabase orders insert error", error);
          return null;
        }
        return mapOrderRow(record);
      },
      clearOrders: async () => {
        const { error } = await client.from("orders").delete().neq("id", "");
        if (error) {
          console.warn("Supabase orders clear error", error);
        }
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
          console.warn("Supabase orders update error", error);
          return null;
        }
        return mapOrderRow(data);
      },
      deleteOrder: async (id) => {
        const { error } = await client.from("orders").delete().eq("id", id);
        if (error) {
          console.warn("Supabase orders delete error", error);
        }
        return !error;
      }
    };
  };

  let activeAdapter = null;
  let adapterReady = null;

  const buildDisabledAdapter = (reason) => ({
    fetchStoreData: async () => {
      console.warn(reason);
      return null;
    },
    saveStoreData: async () => {
      console.warn(reason);
      return false;
    },
    login: async () => {
      console.warn(reason);
      return false;
    },
    checkAuth: async () => {
      console.warn(reason);
      return false;
    },
    logout: async () => {
      console.warn(reason);
      return false;
    },
    updatePin: async () => {
      console.warn(reason);
      return false;
    },
    getTelegramSettings: async () => {
      console.warn(reason);
      return null;
    },
    saveTelegramSettings: async () => {
      console.warn(reason);
      return false;
    },
    fetchOrders: async () => {
      console.warn(reason);
      return null;
    },
    createOrder: async () => {
      console.warn(reason);
      return null;
    },
    clearOrders: async () => {
      console.warn(reason);
      return false;
    },
    updateOrder: async () => {
      console.warn(reason);
      return null;
    },
    deleteOrder: async () => {
      console.warn(reason);
      return false;
    }
  });

  const pickAdapter = async () => {
    if (BACKEND_MODE === "php") {
      activeAdapter = phpAdapter;
      return;
    }
    const supaAdapter = createSupabaseAdapter();
    if (BACKEND_MODE === "supabase") {
      if (supaAdapter) {
        activeAdapter = supaAdapter;
      } else {
        activeAdapter = buildDisabledAdapter(
          "Supabase adapter not ready. Check supabase script + DODY_SUPABASE config."
        );
      }
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
    if (!adapterReady) {
      adapterReady = pickAdapter();
    }
    await adapterReady;
    return activeAdapter[fn](...args);
  };

  window.DodyApi = {
    fetchStoreData: (...args) => proxy("fetchStoreData", ...args),
    saveStoreData: (...args) => proxy("saveStoreData", ...args),
    login: (...args) => proxy("login", ...args),
    logout: (...args) => proxy("logout", ...args),
    checkAuth: (...args) => proxy("checkAuth", ...args),
    updatePin: (...args) => proxy("updatePin", ...args),
    getTelegramSettings: (...args) => proxy("getTelegramSettings", ...args),
    saveTelegramSettings: (...args) => proxy("saveTelegramSettings", ...args),
    fetchOrders: (...args) => proxy("fetchOrders", ...args),
    createOrder: (...args) => proxy("createOrder", ...args),
    clearOrders: (...args) => proxy("clearOrders", ...args),
    updateOrder: (...args) => proxy("updateOrder", ...args),
    deleteOrder: (...args) => proxy("deleteOrder", ...args)
  };

  adapterReady = pickAdapter();
})();
