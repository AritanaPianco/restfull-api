import { ICreateCustomer } from "../models/ICreateCustomer";
import { ICustomer } from "../models/ICustomer";
import { IPaginateCustomer } from "../models/IPaginateCustomer";

export interface ICustomersRepository{
    findByName(name: string): Promise<ICustomer | undefined>;
    findById(id: number): Promise<ICustomer | undefined>;
    findByEmail(email: string): Promise<ICustomer | undefined>;
    create(data: ICreateCustomer): Promise<ICustomer>;
    save(customer: ICustomer): Promise<ICustomer>;
    paginate(): Promise<IPaginateCustomer | undefined>;
    delete(customer: ICustomer): Promise<void>;

}
