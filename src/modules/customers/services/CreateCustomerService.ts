import AppError from '@shared/errors/AppError';
import { ICustomersRepository } from '../domain/repositories/ICustomersReporitory';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomer } from '../domain/models/ICustomer';
import { inject, injectable } from 'tsyringe';


@injectable()
class CreateCustomerService{
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
    ){}

    public async execute({ name, email }: ICreateCustomer): Promise<ICustomer>{
         const customerExist = await this.customersRepository.findByEmail(email);

         if(customerExist){
             throw new AppError('There is already one customer with this email');
         }

         const customer = await this.customersRepository.create({
             name,
             email
         })

         return customer;
    }

}

export default CreateCustomerService;
