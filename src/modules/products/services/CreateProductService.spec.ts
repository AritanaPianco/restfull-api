import AppError from "@shared/errors/AppError"
import { FakerProductRepository } from "../domain/repositories/fakes/fakerProductsRepository"
import CreateProductService from "./CreateProductService"

let fakerProductsRepository: FakerProductRepository
let createProduct: CreateProductService

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

    it('should be able to create a product', async () => {
        expect(
            createProduct.execute({
                name: 'controle',
                price: 50,
                quantity: 15
            })
        ).resolves.not.toBeInstanceOf(AppError)
    })

   


})