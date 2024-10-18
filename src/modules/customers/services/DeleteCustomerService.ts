import AppError from '@shared/errors/AppError';
import { ICustomersRepository } from '../domain/repositories/ICustomersReporitory';
import { inject, injectable } from 'tsyringe';


interface IRequest{
     customer_id: number;
}

@injectable()
class DeleteCustomerService{
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
    ){}

     public async execute({ customer_id }: IRequest): Promise<void>{
        //    const id = parseInt(customer_id);
           const customer = await this.customersRepository.findById(customer_id);

           if(!customer){
              throw new AppError('Customer not found')
           }
           await this.customersRepository.delete(customer);
     }
}

export default DeleteCustomerService;
