import express from 'express'
import { routes } from './routes'
import { notFound } from './middlewares/notFound'
import { errorHandler } from './middlewares/errorHandler'
import { requestId } from './middlewares/requestId'

export function createApp() {
    const app = express()

    // Parse JSON body
    app.use(express.json())

    // Request id (for tracing)
    app.use(requestId())

    // Routes
    app.use(routes)

    // 404
    app.use(notFound())

    // Centralized error handler (must be last)
    app.use(errorHandler())

    return app
}