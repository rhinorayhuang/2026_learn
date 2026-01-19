import type { Response } from 'express'

export type ApiSuccess<T> = {
    requestId?: string
    ok: true
    data: T
    meta?: Record<string, unknown>
}

export type ApiError = {
    requestId?: string
    ok: false
    error: {
        code: string
        message: string
        details?: Record<string, unknown>
    }
}

export function sendOk<T>(
    res: Response,
    data: T,
    meta?: Record<string, unknown>
) {
    const requestId = res.getHeader('X-Request-Id')?.toString()
    const body: ApiSuccess<T> = {
        ok: true,
        requestId,
        data,
        meta
    }
    return res.json(body)
}

export function sendCreated<T>(
    res: Response,
    data: T,
    meta?: Record<string, unknown>
) {
    const requestId = res.getHeader('X-Request-Id')?.toString()
    const body: ApiSuccess<T> = {
        ok: true,
        requestId,
        data,
        meta
    }
    return res.status(201).json(body)
}