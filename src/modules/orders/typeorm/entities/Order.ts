import {Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm'
import Customer from '@modules/customers/typeorm/entities/Customer'
import OrdersProducts from './OrdersProducts'

@Entity('orders')
class Order{

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Customer) // many orders to one customer
    @JoinColumn({name: 'customer_id'})
    customer: Customer

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
