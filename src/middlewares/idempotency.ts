import type { Request, Response, NextFunction } from "express";
import { idempotencyStore } from "../utils/idempotencyStore";

export function idempotency() {
    return (req: Request, res: Response, next: NextFunction) => {
        const key = req.header('Idempotency-Key');

        const isWrite = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method.toUpperCase());
        if (!isWrite || !key) return next()

        const cached = idempotencyStore.get(key);
        if (cached) {
            res.status(cached.status).json(cached.body);
            return
        }

        const originalJson = res.json.bind(res)
        res.json = (body: unknown) => {
            idempotencyStore.set(key, res.statusCode || 200, body)
            return originalJson(body)
        }

        next()
    }
}