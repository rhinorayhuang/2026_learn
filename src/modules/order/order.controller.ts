import { z } from "zod";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendCreated } from "../../utils/apiResponse";
import { HttpError } from "../../utils/httpError";
import { orderService } from "./order.service";

function getUserId(req: any) {
	const userId = req.header("X-User-Id");
	if (!userId)
		throw new HttpError(401, "UNAUTHORIZED", "Missing X-User-Id header");
	return userId;
}

export const createOrder = asyncHandler(async (req, res) => {
	const userId = getUserId(req);
	const order = orderService.createFromCart(userId);
	return sendCreated(res, order);
});

export const listOrders = asyncHandler(async (req, res) => {
	const userId = getUserId(req);
	return sendCreated(res, orderService.list(userId));
});

export const getOrder = asyncHandler(async (req, res) => {
	const userId = getUserId(req);

	const schema = z.object({ orderId: z.string().min(1) });

	const { orderId } = schema.parse(req.params);

	return sendCreated(res, orderService.get(userId, orderId));
});
