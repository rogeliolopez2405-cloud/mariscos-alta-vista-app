import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/orderStore";
import { OrderStatus } from "@/lib/types";

const VALID_STATUSES: OrderStatus[] = ["new", "preparing", "ready", "completed"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await request.json()) as { status: OrderStatus };
  const status: OrderStatus = body.status;

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const order = await updateOrderStatus(id, status);
  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  return NextResponse.json({ order });
}
