import {Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm'
import Customer from '@modules/customers/infra/typeorm/entities/Customer'
import OrdersProducts from './OrdersProducts'
import type { ICustomer } from '@modules/customers/domain/models/ICustomer'
import type { IOrder } from '@modules/orders/domain/models/IOrder'

@Entity('orders')
class Order implements IOrder{

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Customer) // many orders to one customer
    @JoinColumn({name: 'customer_id'})
    customer: ICustomer

    @OneToMany(() => OrdersProducts, order_products => order_products.order, {
       cascade: true
    })
    order_products: OrdersProducts[]


    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date


}

export default Order;
