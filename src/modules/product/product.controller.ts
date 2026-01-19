import { z } from 'zod'
import { asyncHandler } from '../../utils/asyncHandler'
import { productService } from './product.service'
import { sendOk } from '../../utils/apiResponse'

export const listProducts = asyncHandler(async (_req, res) => {
    return sendOk(res, productService.list())
})

export const getProduct = asyncHandler(async (req, res) => {
    const schema = z.object({
        id: z.string().min(1)
    })
    const { id } = schema.parse(req.params)
    return sendOk(res, productService.get(id))
})