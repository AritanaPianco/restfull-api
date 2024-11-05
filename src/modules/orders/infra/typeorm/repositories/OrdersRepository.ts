import { type Repository, getRepository } from 'typeorm'
import Order from '../entities/Order';
import type { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import type { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';


export class OrdersRepository implements IOrdersRepository{

    private ormRepository: Repository<Order>

    constructor(){
        this.ormRepository = getRepository(Order)
    }

    public async findById(id: number): Promise<Order | undefined>{
          const order = this.ormRepository.findOne(id,{
              relations: ['order_products', 'customer']
          });

           return order;
    }

    public async createOrder({customer, products}: ICreateOrder): Promise<Order>{
         const order = this.ormRepository.create({
              customer,
              order_products: products
         })

         await this.ormRepository.save(order);

         return order;

    }


}
