import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { HttpError } from "../utils/httpError";
import { logError } from "../utils/logger";

export function errorHandler(): ErrorRequestHandler {
    return (err, req, res, next) => {
        const requestId = req.requestId

        // Zod validation error
        if (err instanceof ZodError) {
            logError('validation_error', { requestId, issues: err.issues })
            return res.status(400).json({
                ok: false,
                requestId,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid request',
                    details: err.issues
                }
            })
        }

        // Known http error
        if (err instanceof HttpError) {
            logError('http_error', { requestId, status: err.status, message: err.message, details: err.details, code: err.code })
            return res.status(err.status).json({
                ok: false,
                requestId,
                error: {
                    code: err.code,
                    message: err.message,
                    details: err.details
                }
            })
        }

        logError('unhandled_error', { requestId, message: err?.message, stack: err?.stack })

        return res.status(500).json({
            ok: false,
            requestId,
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Internal server error'
            }
        })
    }
}