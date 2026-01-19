import type { Cart } from './cart.model.js';

const carts = new Map<string, Cart>();

function now() {
    return new Date().toISOString();
}

export const cartRepo = {
    getOrCreate(userId: string): Cart {
        const existing = carts.get(userId);
        if (existing) return existing;
        const created: Cart = { userId, items: [], updatedAt: now() };
        carts.set(userId, created);
        return created;
    },
    save(cart: Cart) {
        cart.updatedAt = now();
        carts.set(cart.userId, cart);
        return cart;
    },
    clear(userId: string) {
        const cart = this.getOrCreate(userId);
        cart.items = [];
        return this.save(cart)
    }
}