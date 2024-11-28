import "reflect-metadata";
import FakeCustomersRepository from "../domain/repositories/fakes/fakeCustomersRepository";
import ListCustomersService from "./ListCustomerService";

let fakeCustomersRepository: FakeCustomersRepository;
let listCustomer: ListCustomersService

describe('ListCustomer', () => {

    beforeEach(() => {
        fakeCustomersRepository = new FakeCustomersRepository();
        listCustomer = new ListCustomersService(fakeCustomersRepository);
    })

    it('should be able to return customers with pagination', async () => {
       await fakeCustomersRepository.create({
             name: 'aritana',
             email: 'ari@gmail.com'
        }) 
       await fakeCustomersRepository.create({
             name: 'ariana',
             email: 'ariana@gmail.com'
        }) 
        await fakeCustomersRepository.create({
             name: 'elien',
             email: 'eli@gmail.com'
        }) 
        await fakeCustomersRepository.create({
             name: 'elisa',
             email: 'elisa@gmail.com'
        }) 
        
        await fakeCustomersRepository.create({
             name: 'marcela',
             email: 'marcela@gmail.com'
        }) 
        
        const page = 1;
        const limit = 2
        const result = await listCustomer.execute({page,limit})
         expect(result).toHaveProperty("per_page");
         expect(result).toHaveProperty("total");
         expect(result).toHaveProperty("current_page");
         expect(result).toHaveProperty("data");
         expect(result.data).toHaveLength(2)

    })
})