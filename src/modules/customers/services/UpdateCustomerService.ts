import AppError from '@shared/errors/AppError';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersReporitory';
import { inject, injectable } from 'tsyringe';

interface IRequest{
    customer_id: string;
    name: string;
    email: string
}

@injectable()
class UpdateCustomerService{

        constructor(
            @inject('CustomersRepository')
            private customersRepository: ICustomersRepository
        ){}

        public async execute({ customer_id,name, email}: IRequest): Promise<ICustomer>{
            //    const id = parseInt(customer_id);
               const id = customer_id;
               const customer = await this.customersRepository.findById(id);

               if(!customer){
                   throw new AppError('Customer not found')
               }

               const emailExist = await this.customersRepository.findByEmail(email);

               //isso em caso se ele passar o mesmo email se esse email que foi passado é diferente do customer significa que ja tem um user com esse email
               if(emailExist && email !== customer.email){ 
                  throw new AppError('there is allready onde customer with this email')
               }

               customer.name = name;
               customer.email = email;

               await this.customersRepository.save(customer)

               return customer;

        }

}

export default UpdateCustomerService;
