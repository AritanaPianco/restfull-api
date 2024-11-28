import {Repository} from 'typeorm'
import Customer from '../entities/Customer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersReporitory';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { IPaginateCustomer } from '@modules/customers/domain/models/IPaginateCustomer';
import { AppDataSource } from '@shared/infra/typeorm';
import { SearchParams } from '@modules/customers/domain/repositories/ICustomersReporitory';



class CustomersRepository implements ICustomersRepository{

    private ormRepository: Repository<Customer>;

    constructor(){
        this.ormRepository = AppDataSource.getRepository(Customer);
    }

    public async findAll({page, skip, take}: SearchParams): Promise<IPaginateCustomer | null> {
         const [customers, count] = await this.ormRepository.createQueryBuilder().skip(skip).take(take).getManyAndCount()
         
         const result ={
            per_page: take,
            total: count,
            current_page: page,
            data: customers
         } 

         return result;
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


    public async findByName(name: string): Promise<Customer | null>{
        const customer = await this.ormRepository.findOneBy({name});

        return customer;
    }


    public async findById(id: string): Promise<Customer | null>{
           const customer = await this.ormRepository.findOneBy({id})

           return customer;
    }

    public async findByEmail(email: string): Promise<Customer | null>{
           const customer = await this.ormRepository.findOneBy({email})

           return customer;
    }
}

export default CustomersRepository;
