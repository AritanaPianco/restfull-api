import {EntityRepository, Repository, getRepository} from 'typeorm'
import Customer from '../entities/Customer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersReporitory';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { IPaginateCustomer } from '@modules/customers/domain/models/IPaginateCustomer';

class CustomersRepository implements ICustomersRepository{

    private ormRepository: Repository<Customer>;

    constructor(){
        this.ormRepository = getRepository(Customer);
    }

    public async paginate(): Promise<IPaginateCustomer>{
         const customers = this.ormRepository.createQueryBuilder().paginate();

         return customers;
    }

    public async create({name, email}: ICreateCustomer): Promise<Customer>{
        const customer = this.ormRepository.create({name, email});

        await this.ormRepository.save(customer);
        return customer;
    }

    public async save(customer: ICustomer): Promise<Customer>{
           await this.ormRepository.save(customer);
           return customer;
    }

    public async delete(customer: ICustomer): Promise<void>{
        await this.ormRepository.delete(customer);

    }


    public async findByName(name: string): Promise<Customer | undefined>{
        const customer = await this.ormRepository.findOne({
             where: {
                name
             }
        });

        return customer;
    }


    public async findById(id: number): Promise<Customer | undefined>{
           const customer = await this.ormRepository.findOne({
               where: {
                  id
              }
           })

           return customer;
    }

    public async findByEmail(email: string): Promise<Customer | undefined>{
           const customer = await this.ormRepository.findOne({
               where: {
                  email
              }
           })

           return customer;
    }
}

export default CustomersRepository;
