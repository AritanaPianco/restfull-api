import AppError from "@shared/errors/AppError"
import { FakerProductRepository } from "../domain/repositories/fakes/fakerProductsRepository"
import DeleteProductService from "./DeleteProductService"
import RedisCache from "@shared/cache/RedisCache"

let fakerProductsRepository: FakerProductRepository
let deleteProduct: DeleteProductService

const mockInvalidate = jest.fn()

jest.mock('@shared/cache/RedisCache', () => {
    return jest.fn().mockImplementation(() => {
        return {
            invalidate: mockInvalidate
        }
  })
})

describe('deleteProduct', () => {

     beforeEach(() => {
         fakerProductsRepository = new FakerProductRepository();
         deleteProduct = new DeleteProductService(fakerProductsRepository) 
     })

    it('should trown an erro in case non existed product ', async () => {
              
         expect(
             deleteProduct.execute({id: 66})
            ).rejects.toBeInstanceOf(AppError)
         
    })

    it('should be able call invalidate method and delete method', async () => {
        const redisCache = new RedisCache()
        const invalidateMethod =  jest.spyOn(redisCache, 'invalidate')
        const deleteMethod = jest.spyOn(fakerProductsRepository, 'delete')

         const product = await fakerProductsRepository.create({
             name: 'x box',
             price: 3000,
             quantity: 20
         })


          await deleteProduct.execute({
             id: product.id
          })

          expect(invalidateMethod).toHaveBeenCalled()
          expect(deleteMethod).toHaveBeenCalled()
                   
    })

})