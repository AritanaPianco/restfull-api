
import Customer from '../../../infra/typeorm/entities/Customer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersReporitory';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { IPaginateCustomer } from '@modules/customers/domain/models/IPaginateCustomer';

class FakeCustomersRepository implements ICustomersRepository {

    private customers: Customer[]= [];

    public async create({name, email}: ICreateCustomer): Promise<Customer>{
            const customer = new Customer();

            customer.name = name;
            customer.email = email;
            this.customers.push(customer);

            return customer;

    }
    public async paginate(): Promise<IPaginateCustomer | undefined>{
            return undefined;
    }

    public async save(customer: ICustomer): Promise<Customer>{
        const findIndex = this.customers.findIndex(findCustomer => findCustomer.id === customer.id);
        this.customers[findIndex] = customer;
        // Object.assign(this.customers, customer);
        return customer;

    }

    public async delete(customer: ICustomer): Promise<void>{
         const customerIndex = this.customers.findIndex(cliente => cliente.id === customer.id);
         this.customers.splice(customerIndex, 1);

    }

    public async findByName(name: string): Promise<Customer | undefined>{
        const customer = this.customers.find(customer => customer.name === name);
        return customer;
    }


    public async findById(id: number): Promise<Customer | undefined>{
        const customer = this.customers.find(customer => customer.id === id);
        return customer;
    }

    public async findByEmail(email: string): Promise<Customer | undefined>{
        const customer = this.customers.find(customer => customer.email === email);
        return customer;
    }

}

export default FakeCustomersRepository;
