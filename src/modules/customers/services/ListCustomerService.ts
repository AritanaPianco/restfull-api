import type { ICustomersRepository } from '../domain/repositories/ICustomersReporitory';
import type { IPaginateCustomer } from '../domain/models/IPaginateCustomer';
import { inject, injectable } from 'tsyringe';


@injectable()
class ListCustomersService {
     constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
    ){}

     public async execute(): Promise<IPaginateCustomer>{
         const customers = await this.customersRepository.paginate();

         return customers as IPaginateCustomer;
     }
}

export default ListCustomersService;
