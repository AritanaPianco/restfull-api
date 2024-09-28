import {Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm'
import Customer from '@modules/customers/typeorm/entities/Customer'

@Entity('orders')
class Order{

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Customer) // many orders to one customer
    @JoinColumn({name: 'customer_id'})
    customer: Customer


    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date


}

export default Order;
