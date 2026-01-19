import type { Product } from './product.model'

// 先用 in-memory，之後再換成 SQL
const products: Product[] = [
    { id: 'p_1', name: 'Coffee', price: 120 },
    { id: 'p_2', name: 'Sandwich', price: 180 },
]

export const productRepo = {
    list(): Product[] {
        return products
    },
    getById(id: string): Product | undefined {
        return products.find(p => p.id === id)
    }
}