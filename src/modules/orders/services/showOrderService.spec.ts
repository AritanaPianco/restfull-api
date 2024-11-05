import AppError from "@shared/errors/AppError"

import { FakerOrdersRepository } from "../domain/repositories/fakes/fakerOrdersRepository"
import ShowOrderService from "./ShowOrderService"
import FakeCustomersRepository from "@modules/customers/domain/repositories/fakes/fakeCustomersRepository"
import { FakerProductRepository } from "@modules/products/domain/repositories/fakes/fakerProductsRepository"

let fakerProductsRepository: FakerProductRepository
let fakerCustomersRepository: FakeCustomersRepository
let fakerOrdersRepository: FakerOrdersRepository
let showOrder: ShowOrderService



describe('showOrder', () => {

    beforeEach(() => {
        fakerProductsRepository = new FakerProductRepository();
         fakerCustomersRepository = new FakeCustomersRepository()
         fakerOrdersRepository = new FakerOrdersRepository()
         showOrder = new ShowOrderService(fakerOrdersRepository) 
    })


    it('should trown an error for order not found', async () => {
     
       expect(
          showOrder.execute({
              id: 20
          })
       ).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to find an order', async () => {
      const customer = await fakerCustomersRepository.create({
         name: 'jose',
         email: 'jose@gmail.com'
      })

      const product = await fakerProductsRepository.create({
           name: 'product1',
           price: 20,
           quantity: 10
      })

       const order = await fakerOrdersRepository.createOrder({
          customer,
          products: [{
              product_id: product.id,
              price: 20,
              quantity: 2
          }]
       })

       expect(
          showOrder.execute({
              id: order.id
          })
       ).resolves.not.toBeInstanceOf(AppError)
    })


})