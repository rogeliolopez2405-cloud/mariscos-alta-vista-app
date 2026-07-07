import { promises as fs } from "fs";
import path from "path";
import { Order, OrderStatus } from "./types";

// Local JSON file storage for the demo/prototype. Swap for a real database
// (Postgres/Supabase/etc.) before this goes into real production use.
const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(ORDERS_FILE);
  } catch {
    await fs.writeFile(ORDERS_FILE, "[]", "utf-8");
  }
}

export async function getOrders(): Promise<Order[]> {
  await ensureStore();
  const raw = await fs.readFile(ORDERS_FILE, "utf-8");
  const orders: Order[] = JSON.parse(raw);
  return orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addOrder(order: Order): Promise<void> {
  await ensureStore();
  const orders = await getOrders();
  orders.push(order);
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<Order | null> {
  await ensureStore();
  const orders = await getOrders();
  const order = orders.find((o) => o.id === id);
  if (!order) return null;
  order.status = status;
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
  return order;
}
