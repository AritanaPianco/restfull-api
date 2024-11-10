import type { ICustomer } from "@modules/customers/domain/models/ICustomer";

interface IProduct{
    product_id: string;
    price: number;
    quantity: number
}

export interface ICreateOrder{
   customer: ICustomer;
   products: IProduct[];

}
