import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") ?? "";
const CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID") ?? "";
const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET") = ;

const sendMessage = async (text: string) => {
  if (!BOT_TOKEN || !CHAT_ID || !text) {
    return { ok: false, status: 400 };
  }
  const body = {
    chat_id: CHAT_ID,
    text,
    disable_web_page_preview: true,
  };
  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { ok: response.ok, status: response.status };
};

const formatOrderItems = (items: any[] = []) => {
  if (!Array.isArray(items) || items.length === 0) {
    return "";
  }
  return items
    .map((item) => {
      const name = item.nameAr || item.nameEn || item.id || "Item";
      const qty = Number(item.qty || 1);
      return `- ${name} × ${qty}`;
    })
    .join("\n");
};

const buildMessage = (payload: any) => {
  if (!payload || typeof payload !== "object") {
    return "";
  }
  const type = payload.type || payload.eventType || "";
  const table = payload.table || "";
  const record = payload.record || payload.new_record || payload.new || {};
  const old = payload.old_record || payload.old || {};

  if (table === "orders") {
    const id = record.id || old.id || "";
    const name = record.name || old.name || "";
    const phone = record.phone || old.phone || "";
    const total = record.total ?? old.total ?? "";
    if (type === "INSERT") {
      const itemsText = formatOrderItems(record.items || []);
      return `🆕 طلب جديد #${id}\nالاسم: ${name}\nالهاتف: ${phone}\nالإجمالي: ${total}\n${itemsText}`;
    }
    if (type === "UPDATE") {
      const status = record.status || old.status || "";
      const shipping = record.shipping_status || old.shipping_status || record.shippingStatus || "";
      const fee = record.delivery_fee ?? record.deliveryFee ?? "";
      return `✏️ تحديث طلب #${id}\nالحالة: ${status}\nالشحن: ${shipping}\nالتوصيل: ${fee}`;
    }
    if (type === "DELETE") {
      return `🗑️ تم حذف الطلب #${id}`;
    }
  }

  if (table === "store_data" && (type === "UPDATE" || type === "INSERT")) {
    return "✅ تم تحديث بيانات المتجر من لوحة التحكم.";
  }

  return "";
};

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("ok", { status: 200 });
  }

  if (WEBHOOK_SECRET) {
    const incoming =
      req.headers.get("x-webhook-secret") ||
      req.headers.get("x-supabase-signature") ||
      "dody_9f7c1b0d_ba62_4a11_9d1c_39e6f0b5d5a2";
    if (incoming !== WEBHOOK_SECRET) {
      return new Response("unauthorized", { status: 401 });
    }
  }

  let payload: any = null;
  try {
    payload = await req.json();
  } catch {
    return new Response("bad request", { status: 400 });
  }

  const message = buildMessage(payload);
  if (!message) {
    return new Response("no message", { status: 200 });
  }

  const result = await sendMessage(message);
  return new Response(result.ok ? "sent" : "failed", { status: result.ok ? 200 : 500 });
});
