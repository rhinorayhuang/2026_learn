import { Router } from "express";
import { idempotency } from "../../middlewares/idempotency";
import { createOrder, getOrder, listOrders } from "./order.controller";

export const orderRouter = Router();

orderRouter.get("/", listOrders);

orderRouter.get("/:orderId", getOrder);

orderRouter.post("/", idempotency(), createOrder);
