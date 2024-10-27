import AppError from "@shared/errors/AppError"
import { FakerProductRepository } from "../domain/repositories/fakes/fakerProductsRepository"
import CreateProductService from "./CreateProductService"
import RedisCache from "@shared/cache/RedisCache"


let fakerProductsRepository: FakerProductRepository
let createProduct: CreateProductService

const mockInvalidate = jest.fn()

jest.mock('@shared/cache/RedisCache', () => {
     return jest.fn().mockImplementation(() => {
          return {
             invalidate: mockInvalidate
          }
     })
})


describe('createProduct', () => {

    beforeEach(() => {
         fakerProductsRepository = new FakerProductRepository();
         createProduct = new CreateProductService(fakerProductsRepository) 
    })

    it('should throw an error if there is two products with the same name', async () => {
           const product = fakerProductsRepository.create({
               name: 'controle',
               price: 45,
               quantity: 10
           })    
           
           expect( 
               createProduct.execute({
                name: 'controle',
                price: 50,
                quantity: 15
               })
           ).rejects.toBeInstanceOf(AppError)
         
    })

    it('should be able to call invalidate method form redis and create method', async () => {
         const redisCache = new RedisCache()
         const invalidateMethod = jest.spyOn(redisCache, 'invalidate')
         const createMethod = jest.spyOn(fakerProductsRepository, 'create')

        await createProduct.execute({
            name: 'mesa',
            price: 50,
            quantity: 15
        })
            
        expect(invalidateMethod).toHaveBeenCalled()
        expect(createMethod).toHaveBeenCalled()
       
    })


})