import "reflect-metadata";
import CreateCustomerService from "./CreateCustomerService";
import UpdateCustomerService from "./UpdateCustomerService";
import FakeCustomersRepository from "../domain/repositories/fakes/fakeCustomersRepository";
import AppError from "@shared/errors/AppError";

let fakeCustomersRepository: FakeCustomersRepository;
let updateCustomer: UpdateCustomerService;
let createCustomer: CreateCustomerService

describe('UpdateCustomer', () => {

    beforeEach(() => {
        fakeCustomersRepository = new FakeCustomersRepository();
        updateCustomer = new UpdateCustomerService(fakeCustomersRepository);
        createCustomer = new CreateCustomerService(fakeCustomersRepository);
    })

    it('should not be able to update a non exist customer', async () => { 
         expect(
               updateCustomer.execute({
                  customer_id: '3',
                  name: 'Jorge Luiz',
                  email: 'teste@gmail.com'
               })
         ).rejects.toBeInstanceOf(AppError);
    })
   
    it('should not be able to update a customer with duplicates emails', async () => {
        const user1 = await fakeCustomersRepository.create({
             name: 'maria',
             email: 'maria@gmail.com'
        })

        const user2 = await fakeCustomersRepository.create({
             name: 'joao',
             email: 'joao@gmail.com'
        })

         expect(
            updateCustomer.execute({
                 customer_id: user2.id,
                 name: 'maria silva',
                 email: 'joao@gmail.com'
            })
         ).rejects.toBeInstanceOf(AppError) 
            
    })

    it('should be able to update a customer', async () => {
            const customer = await createCustomer.execute({
                  name: 'Jorge Luiz',
                  email: 'teste@gmail.com'
            })
              
            const customerUpdated = updateCustomer.execute({
                customer_id: customer.id,
                name: 'Jorge Luiz',
                email: 'teste@gmail.com' 
            })
            expect(customerUpdated).resolves.not.toBeInstanceOf(AppError)
        
    })


})
