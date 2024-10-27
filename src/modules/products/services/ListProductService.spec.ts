import { FakerProductRepository } from "../domain/repositories/fakes/fakerProductsRepository"
import ListProductService from "./ListProductService"
import RedisCache from "@shared/cache/RedisCache"


let fakerProductsRepository: FakerProductRepository
let listProduct: ListProductService

const mockInvalidate = jest.fn()
const mockSave = jest.fn()

jest.mock('@shared/cache/RedisCache', () => {
      return jest.fn().mockImplementation(() => {
            return {
                  invalidate: mockInvalidate,
                  save: mockSave
            }
      })
})

describe('listProducts', () => {

     beforeEach(() => {
         fakerProductsRepository = new FakerProductRepository();
         listProduct = new ListProductService(fakerProductsRepository) 
     })

    it('should be able call invalidate and save method from redisCach and findAll method', async () => {
          const product1 = await fakerProductsRepository.create({
                name: 'controle',
                price: 400,
                quantity: 20
          })      

          const product2 = await fakerProductsRepository.create({
                name: 'guarda chuva',
                price: 700,
                quantity: 20
          })      
        
          const redisCache = new RedisCache()
          const invalidate = jest.spyOn(redisCache, 'invalidate')
          const save = jest.spyOn(redisCache, 'save')
          const findAll = jest.spyOn(fakerProductsRepository, 'findAllProducts')
          await listProduct.execute()
          
          expect(invalidate).toHaveBeenCalled()
          expect(save).toHaveBeenCalled() 
          expect(findAll).toHaveBeenCalled()

    })


})