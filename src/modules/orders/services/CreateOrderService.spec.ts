import AppError from "@shared/errors/AppError"

import { FakerOrdersRepository } from "../domain/repositories/fakes/fakerOrdersRepository"
import { FakerProductRepository } from "@modules/products/domain/repositories/fakes/fakerProductsRepository"
import FakeCustomersRepository from "@modules/customers/domain/repositories/fakes/fakeCustomersRepository"
import CreateOrderService from "./CreateOrderService"


let fakerProductsRepository: FakerProductRepository
let fakerOrdersRepository: FakerOrdersRepository
let fakerCustomersRepository: FakeCustomersRepository
let createOrder: CreateOrderService



describe('createOrder', () => {

    beforeEach(() => {
         fakerProductsRepository = new FakerProductRepository();
         fakerOrdersRepository = new FakerOrdersRepository();
         fakerCustomersRepository = new FakeCustomersRepository();
         createOrder = new CreateOrderService(fakerOrdersRepository, fakerCustomersRepository, fakerProductsRepository) 
    })


    it('should trown an error when trying to find a customer  that does not exist', async () => {
        const customer = await fakerCustomersRepository.create({
            name: 'jose',
            email: 'jose@gmail.com'
        })    

       expect(
          createOrder.execute({
               customer_id: 3,
               products: [
                   {
                      id: 7,
                      quantity: 2
                   }
               ]
             })
       ).rejects.toBeInstanceOf(AppError)
    })

    it('should trown an error when trying to find a product that does not exist', async () => {
        const customer = await fakerCustomersRepository.create({
            name: 'jose',
            email: 'jose@gmail.com'
        })    

       expect(
          createOrder.execute({
               customer_id: customer.id,
               products: [
                   {
                      id: 7,
                      quantity: 2
                   }
               ]
             })
       ).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to find a customer and find the existents products', async () => {
           const customer = await fakerCustomersRepository.create({
               name: 'jose',
               email: 'jose@gmail.com'
           })    

          const product = await fakerProductsRepository.create({
             name: 'product1',
             price: 20,
             quantity: 10
          })
 
          expect(
               createOrder.execute({
                 customer_id: customer.id,
                 products: [
                     {
                        id: product.id,
                        quantity: 2
                     }
                 ]
               })
           ).resolves.not.toBeInstanceOf(AppError)
         
    })

   


})