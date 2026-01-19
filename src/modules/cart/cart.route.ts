import { Router } from "express";
import { idempotency } from "../../middlewares/idempotency";
import { clearCart, getCart, upsertItem, removeItem } from "./cart.controller";

export const cartRouter = Router();

cartRouter.get("/", getCart);

cartRouter.post("/item", idempotency(), upsertItem);
cartRouter.delete("/item/:productId", idempotency(), removeItem);
cartRouter.post("/", idempotency(), clearCart);
