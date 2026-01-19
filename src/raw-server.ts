import http from 'http'
import { config } from './config'

function json(res: http.ServerResponse, status: number, data: unknown) {
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}

const server = http.createServer((req, res) => {
    const { method, url } = req
    
    if (method === 'GET' && url === '/health') {
        json(res, 200, { status: 'ok' })
        return
    }

    if (method === 'GET' && url === '/time') {
        res.statusCode = 200
        res.end(new Date().toISOString())
        return
    }

    if (method === 'POST' && url === '/echo') {
        let body = ''

        req.on('data', chunk => {
            body += chunk
        })

        req.on('end', () => {
            json(res, 200, { received: body })
        })

        return
    }

    res.statusCode = 404
    res.end('Not Found')
})

server.listen(config.port, () => {
    console.log(`HTTP server listening on port ${config.port} (env: ${config.env})`)
})

export { server }