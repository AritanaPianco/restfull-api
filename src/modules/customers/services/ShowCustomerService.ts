import AppError from '@shared/errors/AppError';
import { ICustomersRepository } from '../domain/repositories/ICustomersReporitory';
import { ICustomer } from '../domain/models/ICustomer';
import { inject, injectable } from 'tsyringe';


interface IRequest{
     customer_id: string
}

@injectable()
class ShowCustomerService{

      constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
      ){}

     public async execute({customer_id}: IRequest): Promise<ICustomer>{
           const id = parseInt(customer_id);
           const customer = await this.customersRepository.findById(id);

           if(!customer){
              throw new AppError('Customer not found')
           }
           return customer;

     }
}

export default ShowCustomerService;
