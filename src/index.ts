import { createApp } from './app'
import { config } from './config'

const app = createApp()

const server = app.listen(config.port, () => {
    console.log(`Express server started on port ${config.port} (env: ${config.env})`)
})

function shutdown(signal: string) {
    console.log(`Received ${signal}, shutting down...`)

    server.close(() => {
        console.log('HTTP server closed')
        process.exit(0)
    })

    setTimeout(() => {
        console.error('Force shutdown')
        process.exit(1)
    }, 10 * 1000)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)