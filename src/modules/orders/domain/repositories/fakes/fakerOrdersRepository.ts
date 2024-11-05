import type Order from '@modules/orders/infra/typeorm/entities/Order';
import type { IOrder } from '../../models/IOrder';
import type { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import type { ICustomer } from '@modules/customers/domain/models/ICustomer';

interface IProduct{
    product_id: number;
    price: number;
    quantity: number
}

export interface ICreateOrder{
   customer: ICustomer;
   products: IProduct[];

}


export class FakerOrdersRepository implements IOrdersRepository{
    private orders: Order[] = []
    private products: IProduct[] = []
    private count = 1

    public async findById(id: number): Promise<Order | undefined>{
          const order = this.orders.find((order) => order.id === id)

           return order;
    }

    public async createOrder({customer, products}: ICreateOrder): Promise<Order>{
    
        const order: IOrder = {
            id: this.count++,
            customer,
            order_products: [],
            created_at: new Date(),
            updated_at: new Date(),
        };

        const orderProducts = products.map((product) => ({
            id: this.count++,
            order,                  
            product: {
                ...product,
                id: product.product_id,
                name: 'nome do produto',
                order_products: [],
                price: product.product_id,
                quantity: product.quantity,
                created_at: new Date(),
                updated_at: new Date(),
            },         
            order_id: order.id,
            product_id: product.product_id,
            price: product.price,
            quantity: product.quantity,
            created_at: new Date(),
            updated_at: new Date(),
        }))


         order.order_products = orderProducts 

         this.orders.push(order)
        

         return order;

    }


}