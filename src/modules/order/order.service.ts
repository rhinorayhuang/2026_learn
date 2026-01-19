import { HttpError } from "../../utils/httpError";
import { cartService } from "../cart/cart.service";
import { productService } from "../product/product.service";
import { orderRepo } from "./order.repo";
import type { OrderItem } from "./order.model";

export const orderService = {
	createFromCart(userId: string) {
		const cart = cartService.getCart(userId);
		if (cart.items.length === 0) {
			throw new HttpError(400, "CART_EMPTY", "Cart is empty");
		}

		const items: OrderItem[] = cart.items.map((ci) => {
			const p = productService.get(ci.productId);
			return {
				productId: ci.productId,
				qty: ci.qty,
				unitPrice: p.price,
			};
		});

		const total = items.reduce(
			(sum, item) => sum + item.qty * item.unitPrice,
			0,
		);

		const order = orderRepo.create({
			userId,
			status: "PENDING_PAYMENT",
			items,
			total,
		});

		cartService.clear(userId);

		return order;
	},

	list(userId: string) {
		return orderRepo.listByUser(userId);
	},

	get(userId: string, orderId: string) {
		const order = orderRepo.getById(orderId);
		if (!order)
			throw new HttpError(404, "ORDER_NOT_FOUND", "Order not found", {
				orderId,
			});
		if (order.userId !== userId)
			throw new HttpError(403, "FORBIDDEN", "Not your order");
		return order;
	},
};
