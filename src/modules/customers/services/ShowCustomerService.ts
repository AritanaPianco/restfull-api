import AppError from '@shared/errors/AppError';
import type { ICustomersRepository } from '../domain/repositories/ICustomersReporitory';
import type { ICustomer } from '../domain/models/ICustomer';
import { inject, injectable } from 'tsyringe';


interface IRequest{
     customer_id: number
}

@injectable()
class ShowCustomerService{

      constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
      ){}

     public async execute({customer_id}: IRequest): Promise<ICustomer>{
      //    const id = parseInt(customer_id);
           const id = customer_id;
           const customer = await this.customersRepository.findById(id);

           if(!customer){
              throw new AppError('Customer not found')
           }
           return customer;

     }
}

export default ShowCustomerService;
