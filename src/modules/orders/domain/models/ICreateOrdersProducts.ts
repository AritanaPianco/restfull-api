import type { IOrder } from "./IOrder";
import type { IProduct } from "@modules/products/domain/models/IProcuct";

export interface ICreateOrdersProducts{
    id: number;
    order: IOrder;
    product: IProduct;
    order_id: number;
    product_id: number;
    price: number;
    quantity: number;
    created_at: Date;
    updated_at: Date
}
