import {getCustomRepository} from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest{
    customer_id: string;
    name: string;
    email: string
}

class UpdateCustomerService{

        public async execute({ customer_id,name, email}: IRequest): Promise<Customer>{
               const id = parseInt(customer_id);
               const customersRepository = getCustomRepository(CustomersRepository);

               const customer = await customersRepository.findById(id);

               if(!customer){
                   throw new AppError('Customer not found')
               }

               const emailExist = await customersRepository.findByEmail(email);

               if(emailExist && email !== customer.email){ // e esse email que foi passado é diferente do customer significa que ja tem um user com esse email
                  throw new AppError('there is allready onde customer with this email')
               }

               customer.name = name;
               customer.email = email;

               await customersRepository.save(customer)

               return customer;

        }

}

export default UpdateCustomerService;
