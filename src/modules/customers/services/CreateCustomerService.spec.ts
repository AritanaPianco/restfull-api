import "reflect-metadata";
import CreateCustomerService from "./CreateCustomerService";
import FakeCustomersRepository from "../domain/repositories/fakes/fakeCustomersRepository";
import AppError from "@shared/errors/AppError";

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {

    beforeEach(() => {
        fakeCustomersRepository = new FakeCustomersRepository();
        createCustomer = new CreateCustomerService(fakeCustomersRepository);
    })

    it('should be able to create a new customer', async () => {

        const customer = await createCustomer.execute({
            name: 'Jorge Luiz',
            email: 'teste@gmail.com'
        })

        expect(customer).toHaveProperty('name');

    })

    it('should not be able to create two customers with the same email', async () => {
       await createCustomer.execute({
            name: 'Jorge Luiz',
            email: 'teste@gmail.com'
        })

        expect(
            createCustomer.execute({
                name: 'Jorge Luiz',
                email: 'teste@gmail.com'
            })
        ).rejects.toBeInstanceOf(AppError)

    })



})
