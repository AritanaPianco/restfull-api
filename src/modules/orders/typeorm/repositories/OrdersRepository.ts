import { EntityRepository, Repository } from 'typeorm'
import Order from '../entities/Order';
import Customer from '@modules/customers/typeorm/entities/Customer';


interface IProduct{
    product_id: number;
    price: number;
    quantity: number
}

interface IRequest{
    customer: Customer;
    products: IProduct[]
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order>{

    public async findById(id: number): Promise<Order | undefined>{
          const order = this.findOne(id,{
              relations: ['order_products', 'customer']
          });

           return order;
    }

    public async createOrder({customer, products}: IRequest): Promise<Order>{
         const order = this.create({
              customer,
              order_products: products
         })

         await this.save(order);

         return order;

    }


}
