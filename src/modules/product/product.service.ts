import { HttpError } from '../../utils/httpError'
import { productRepo } from './product.repo'

export const productService = {
    list() {
        return productRepo.list()
    },
    get(id: string) {
        const product = productRepo.getById(id)
        if (!product) throw new HttpError(404, 'PRODUCT_NOT_FOUND', 'Product not found', { id })
        return product
    }
}