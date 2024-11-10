import "reflect-metadata";
import CreateCustomerService from "./CreateCustomerService";
import DeleteCustomerService from "./DeleteCustomerService";
import FakeCustomersRepository from "../domain/repositories/fakes/fakeCustomersRepository";
import AppError from "@shared/errors/AppError";

let fakeCustomersRepository: FakeCustomersRepository;
let deleteCustomer: DeleteCustomerService;
let createCustomer: CreateCustomerService

describe('DeleteCustomer', () => {

    beforeEach(() => {
        fakeCustomersRepository = new FakeCustomersRepository();
        deleteCustomer = new DeleteCustomerService(fakeCustomersRepository);
        createCustomer = new CreateCustomerService(fakeCustomersRepository);
    })

    it('should be not able to delete a non exist customer', async () => { 
         expect(
               deleteCustomer.execute({
               customer_id: '3'
           })
         ).rejects.toBeInstanceOf(AppError);

    })

    it('should be able to delete a customer', async () => {
            const customer = await createCustomer.execute({
                  name: 'Jorge Luiz',
                  email: 'teste@gmail.com'
            })
         
          expect(
              deleteCustomer.execute({
                customer_id: customer.id
              })
          ).resolves.not.toBeInstanceOf(AppError)
    })


})
