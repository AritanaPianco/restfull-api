import {getCustomRepository} from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';
import AppError from '@shared/errors/AppError';


interface IRequest{
    name: string;
    email: string
}

class CreateCustomerService{
    public async execute({ name, email }: IRequest): Promise<Customer>{
         const customersRepository = getCustomRepository(CustomersRepository);

         const customerExist = await customersRepository.findByEmail(email);

         if(customerExist){
             throw new AppError('There is already one customer with this email');
         }

         const customer = customersRepository.create({
             name,
             email
         })

         await customersRepository.save(customer);

         return customer;
    }

}

export default CreateCustomerService;
