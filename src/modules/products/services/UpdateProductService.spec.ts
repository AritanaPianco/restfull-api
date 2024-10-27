import AppError from "@shared/errors/AppError"
import { FakerProductRepository } from "../domain/repositories/fakes/fakerProductsRepository"
import UpdateProductService from "./UpdateProductService"
import RedisCache from "@shared/cache/RedisCache"

let fakerProductsRepository: FakerProductRepository
let updateProduct: UpdateProductService


const mockInvalidate = jest.fn()

jest.mock('@shared/cache/RedisCache', () => {
    return jest.fn().mockImplementation(() => {
        return {
            invalidate: mockInvalidate
        }
    })
})

describe('updateProduct', () => {

    beforeEach(() => {
         fakerProductsRepository = new FakerProductRepository();
         updateProduct = new UpdateProductService(fakerProductsRepository) 

         mockInvalidate.mockClear()
    })

    it('should throw an error with non existed product', async () => {
           const product = fakerProductsRepository.create({
               name: 'controle',
               price: 45,
               quantity: 10
           })    
           
           expect( 
               updateProduct.execute({
                id: 66,
                name: 'controle',
                price: 50,
                quantity: 15
               })
           ).rejects.toBeInstanceOf(AppError)
         
    })

    it('should not be able to update two products with the same nam', async () => {
        const product1 = await fakerProductsRepository.create({
            name: 'controle simples',
            price: 150,
            quantity: 10
        }) 
        const product2 = await fakerProductsRepository.create({
            name: 'controle ultra',
            price: 200,
            quantity: 10
        }) 


        expect(
             updateProduct.execute({
                 id: product2.id,
                 name: 'controle simples',
                 price: 200,
                 quantity: 250, 
             
             })
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to call invalidate method from redisCache and save method', async () => {
        const product1 = await fakerProductsRepository.create({
            name: 'controle simples',
            price: 150,
            quantity: 10
        }) 
        const product2 = await fakerProductsRepository.create({
            name: 'controle ultra',
            price: 200,
            quantity: 10
        }) 
        
        const redisCach = new RedisCache()
        const invalidate = jest.spyOn(redisCach, 'invalidate')
        const saveMethod = jest.spyOn(fakerProductsRepository, 'save')
        
        await updateProduct.execute({
             id: product2.id,
             name: 'controle ultra',
             price: 150,
             quantity: 20
        })

        expect(invalidate).toHaveBeenCalled()
        expect(saveMethod).toHaveBeenCalled()  

        
    })
   


})