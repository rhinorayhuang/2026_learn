export type CartItem = {
    productId: string
    qty: number
}

export type Cart = {
    userId: string
    items: CartItem[]
    updatedAt: string
}