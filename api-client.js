(function () {
  const API_BASE = window.DODY_API_BASE || "api";

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

  const fetchStoreData = async () => {
    try {
      const data = await getJson("store.php");
      return data?.data || null;
    } catch (error) {
      return null;
    }
  };

  const saveStoreData = async (storeData) => {
    try {
      await postJson("store.php", { data: storeData });
      return true;
    } catch (error) {
      return false;
    }
  };

  const login = async (pin) => {
    try {
      const data = await postJson("login.php", { pin });
      return !!data?.authed;
    } catch (error) {
      return false;
    }
  };

  const checkAuth = async () => {
    try {
      const data = await getJson("login.php");
      return !!data?.authed;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    try {
      await postJson("logout.php", {});
      return true;
    } catch (error) {
      return false;
    }
  };

  const updatePin = async (pin) => {
    try {
      await postJson("pin.php", { pin });
      return true;
    } catch (error) {
      return false;
    }
  };

  const fetchOrders = async () => {
    try {
      const data = await getJson("orders.php");
      return Array.isArray(data?.orders) ? data.orders : [];
    } catch (error) {
      return null;
    }
  };

  const createOrder = async (orderPayload) => {
    try {
      const data = await postJson("orders.php", orderPayload);
      return data?.order || null;
    } catch (error) {
      return null;
    }
  };

  const clearOrders = async () => {
    try {
      await postJson("orders.php", { action: "clear" });
      return true;
    } catch (error) {
      return false;
    }
  };

  const updateOrder = async (id, patch) => {
    try {
      const data = await postJson("order.php", { id, ...patch });
      return data?.order || null;
    } catch (error) {
      return null;
    }
  };

  const deleteOrder = async (id) => {
    try {
      await postJson("order.php", { id, action: "delete" });
      return true;
    } catch (error) {
      return false;
    }
  };

  window.DodyApi = {
    fetchStoreData,
    saveStoreData,
    login,
    logout,
    checkAuth,
    updatePin,
    fetchOrders,
    createOrder,
    clearOrders,
    updateOrder,
    deleteOrder
  };
})();

