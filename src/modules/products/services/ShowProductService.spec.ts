import AppError from "@shared/errors/AppError"
import { FakerProductRepository } from "../domain/repositories/fakes/fakerProductsRepository"
import ShowProductService from "./ShowProductService"

let fakerProductsRepository: FakerProductRepository
let showProduct: ShowProductService

describe('showProduct', () => {

    beforeEach(() => {
         fakerProductsRepository = new FakerProductRepository();
         showProduct = new ShowProductService(fakerProductsRepository) 
    })

    it('should throw an error if there is no product with the id provider', async () => {
              
           expect( 
               showProduct.execute({
                  id: '66'
               })
           ).rejects.toBeInstanceOf(AppError)
         
    })

    it('should be able to show a product', async () => {
        const product = await fakerProductsRepository.create({
              name: 'x box',
              price: 3000,
              quantity: 20
        })
          

        expect(
           showProduct.execute({
              id: product.id
           }) 
        ).resolves.not.toBeInstanceOf(AppError)
    })

   


})