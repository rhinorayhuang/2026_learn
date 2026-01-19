export type OrderStatus = "PENDING_PAYMENT" | "PAID" | "CANCELED";

export type OrderItem = {
	productId: string;
	qty: number;
	unitPrice: number;
};

export type Order = {
	id: string;
	userId: string;
	status: OrderStatus;
	items: OrderItem[];
	total: number;
	createdAt: string;
};
