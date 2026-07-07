import { Order } from "./types";

function formatOrderSummary(order: Order): string {
  const lines = order.items.map(
    (item) => `${item.quantity}x ${item.name}`
  );
  return [
    `New order — Mariscos Alta Vista`,
    `${order.customerName} · ${order.customerPhone}`,
    ...lines,
    `Pickup: ${order.pickupDate} ${order.pickupTime}`,
    `Payment: ${order.paymentMethod === "pay_online" ? "Paid online" : "Pay at pickup"}`,
    `Total: $${order.total.toFixed(2)}`,
  ].join("\n");
}

// TODO: wire up Twilio once an account/number exists.
// Needs env vars: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, OWNER_PHONE_NUMBER
export async function notifyNewOrderBySms(order: Order): Promise<void> {
  const summary = formatOrderSummary(order);
  if (!process.env.TWILIO_ACCOUNT_SID) {
    console.log("[SMS notification - stub, no Twilio configured]\n" + summary);
    return;
  }
  // Real implementation goes here once Twilio credentials are added.
}

// TODO: wire up an email provider (Resend, SendGrid, etc.) once an account exists.
// Needs env vars: RESEND_API_KEY, OWNER_EMAIL
export async function notifyNewOrderByEmail(order: Order): Promise<void> {
  const summary = formatOrderSummary(order);
  if (!process.env.RESEND_API_KEY) {
    console.log("[Email notification - stub, no email provider configured]\n" + summary);
    return;
  }
  // Real implementation goes here once an email provider is added.
}

export async function notifyNewOrder(order: Order): Promise<void> {
  await Promise.all([notifyNewOrderBySms(order), notifyNewOrderByEmail(order)]);
}
