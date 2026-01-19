import { Router } from 'express'
import { healthRouter } from '../modules/health/health.route'
import { productRouter } from '../modules/product/product.route'
import { cartRouter } from '../modules/cart/cart.route'

export const routes = Router()

routes.use('/health', healthRouter)
routes.use('/products', productRouter)
routes.use('/cart', cartRouter)