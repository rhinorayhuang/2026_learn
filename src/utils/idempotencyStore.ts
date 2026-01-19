type Stored = {
    status: number
    body: unknown
    createdAt: number
}

const store = new Map<string, Stored>()

const TTL_MS = 5 * 60 * 1000 // 5 minutes

export const idempotencyStore = {
    get(key: string): Stored | undefined {
        const v = store.get(key)
        if (!v) return undefined

        // TTL cleanup
        if (Date.now() - v.createdAt > TTL_MS) {
            store.delete(key)
            return undefined
        }

        return v
    },
    set(key: string, status: number, body: unknown) {
        store.set(key, { status, body, createdAt: Date.now() })
    }
}