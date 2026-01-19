import { HttpError } from "../../utils/httpError";
import { cartRepo } from "./cart.repo";

export const cartService = {
    getCart(userId: string) {
        return cartRepo.getOrCreate(userId);
    },
    setItem(userId: string, productId: string, qty: number) {
        if (qty <= 0) throw new HttpError(400, 'INVALID_QTY', 'qty must be >= 1', { qty });

        const cart = cartRepo.getOrCreate(userId);
        const idx = cart.items.findIndex(i => i.productId === productId);

        if (idx >= 0) cart.items[idx] = { productId, qty };
        else cart.items.push({ productId, qty });

        return cartRepo.save(cart);
    },
    removeItem(userId: string, productId: string) {
        const cart = cartRepo.getOrCreate(userId);
        cart.items = cart.items.filter(i => i.productId !== productId);
        return cartRepo.save(cart);
    },
    clear(userId: string) {
        return cartRepo.clear(userId);
    }
}