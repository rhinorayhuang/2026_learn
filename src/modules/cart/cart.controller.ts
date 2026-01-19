import { z } from "zod";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendOk } from "../../utils/apiResponse";
import { HttpError } from "../../utils/httpError";
import { cartService } from "./cart.service";

function getUserId(req: any) {
	const userId = req.header("X-User-Id");
	if (!userId)
		throw new HttpError(401, "UNAUTHORIZED", "Missing X-User-Id header");
	return userId;
}

export const getCart = asyncHandler(async (req, res) => {
	const userId = getUserId(req);
	return sendOk(res, cartService.getCart(userId));
});

export const upsertItem = asyncHandler(async (req, res) => {
	const userId = getUserId(req);

	const bodySchema = z.object({
		productId: z.string().min(1),
		qty: z.number().int().min(1),
	});

	const body = bodySchema.parse(req.body);

	return sendOk(res, cartService.setItem(userId, body.productId, body.qty));
});

export const removeItem = asyncHandler(async (req, res) => {
	const userId = getUserId(req);

	const paramsSchema = z.object({ productId: z.string().min(1) });

	const { productId } = paramsSchema.parse(req.params);

	return sendOk(res, cartService.removeItem(userId, productId));
});

export const clearCart = asyncHandler(async (req, res) => {
	const userId = getUserId(req);
	return sendOk(res, cartService.clear(userId));
});
