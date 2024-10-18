import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import OrdersProducts from "@modules/orders/infra/typeorm/entities/OrdersProducts";

export interface IOrder{
    id: number;
    customer: ICustomer;
    order_products: OrdersProducts[];
    created_at: Date;
    updated_at: Date
}
