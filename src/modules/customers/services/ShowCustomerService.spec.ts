import "reflect-metadata";
import CreateCustomerService from "./CreateCustomerService";
import ShowCustomerService from "./ShowCustomerService";
import FakeCustomersRepository from "../domain/repositories/fakes/fakeCustomersRepository";
import AppError from "@shared/errors/AppError";

let fakeCustomersRepository: FakeCustomersRepository;
let showCustomer: ShowCustomerService;
let createCustomer: CreateCustomerService

describe('ShowCustomer', () => {

    beforeEach(() => {
        fakeCustomersRepository = new FakeCustomersRepository();
        showCustomer = new ShowCustomerService(fakeCustomersRepository);
        createCustomer = new CreateCustomerService(fakeCustomersRepository);
    })

    it('should be not able to show a non exist customer', async () => { 
         expect(
               showCustomer.execute({
               customer_id: 3
           })
         ).rejects.toBeInstanceOf(AppError);

    })

    it('should be able to show a customer', async () => {
            const customer = await createCustomer.execute({
                  name: 'Jorge Luiz',
                  email: 'teste@gmail.com'
            })
         
          expect(
               showCustomer.execute({
                  customer_id: customer.id
               })
          ).resolves.not.toBeInstanceOf(AppError)
    })


})
