import type { ICustomersRepository } from '../domain/repositories/ICustomersReporitory';
import type { IPaginateCustomer } from '../domain/models/IPaginateCustomer';
import { inject, injectable } from 'tsyringe';

interface SearchParams{
    page: number,
    limit: number
}

@injectable()
class ListCustomersService {
     constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
    ){}

     public async execute({page, limit}: SearchParams): Promise<IPaginateCustomer>{
         const take = limit;
         const skip = (Number(page) - 1) * take;
         const customers = await this.customersRepository.findAll({page, skip, take});

         return customers as IPaginateCustomer;
     }
}

export default ListCustomersService;
