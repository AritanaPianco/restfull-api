import { IOrder } from "../models/IOrder";
import { ICreateOrder } from "../models/ICreateOrder";


export interface IOrdersRepository{
    findById(id: string): Promise<IOrder | undefined>;
    createOrder({customer, products}: ICreateOrder): Promise<IOrder>

}
