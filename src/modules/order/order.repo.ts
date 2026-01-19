import type { Order } from "./order.model";

const orders = new Map<string, Order>();
const ordersByUser = new Map<string, string[]>();

function now() {
	return new Date().toISOString();
}

function newId() {
	return `o_${Math.random().toString(36).slice(2, 10)}`;
}

export const orderRepo = {
	create(order: Omit<Order, "id" | "createdAt">): Order {
		const created: Order = { ...order, id: newId(), createdAt: now() };
		orders.set(created.id, created);

		const list = ordersByUser.get(created.userId) ?? [];

		list.unshift(created.id);
		ordersByUser.set(created.userId, list);

		return created;
	},
	getById(orderId: string): Order | undefined {
		return orders.get(orderId);
	},
	listByUser(userId: string): Order[] {
		const ids = ordersByUser.get(userId) ?? [];
		return ids.map((id) => orders.get(id)!).filter(Boolean);
	},
};
