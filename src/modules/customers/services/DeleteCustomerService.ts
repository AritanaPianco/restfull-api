import {getCustomRepository} from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import AppError from '@shared/errors/AppError';


interface IRequest{
     customer_id: string
}

class DeleteCustomerService{
     public async execute({customer_id}: IRequest): Promise<void>{
           const id = parseInt(customer_id);
           const customersRepository = getCustomRepository(CustomersRepository);
           const customer = await customersRepository.findById(id);

           if(!customer){
              throw new AppError('Customer not found')
           }

           await customersRepository.delete(customer);

     }
}

export default DeleteCustomerService;
