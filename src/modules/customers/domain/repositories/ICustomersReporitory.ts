import { ICreateCustomer } from "../models/ICreateCustomer";
import { ICustomer } from "../models/ICustomer";
import { IPaginateCustomer } from "../models/IPaginateCustomer";

export type SearchParams = {
   page: number,
   skip: number,
   take: number
}

export interface ICustomersRepository{
    findAll({page, skip, take}: SearchParams): Promise<IPaginateCustomer | null>
    findByName(name: string): Promise<ICustomer | null>;
    findById(id: string): Promise<ICustomer | null>;
    findByEmail(email: string): Promise<ICustomer | null>;
    create(data: ICreateCustomer): Promise<ICustomer>;
    save(customer: ICustomer): Promise<ICustomer>;
    delete(customer: ICustomer): Promise<void>;
}
