import {
     Entity,
     PrimaryGeneratedColumn,
     CreateDateColumn,
     UpdateDateColumn,
     ManyToOne,
     JoinColumn,
     Column} from 'typeorm'
import Order from './Order'
import Product from '@modules/products/infra/typeorm/entities/Product'
import type { IOrdersProducts } from '@modules/orders/domain/models/IOrdersProducts'
import type { IProduct } from '@modules/products/domain/models/IProcuct'

@Entity('orders_products')
class OrdersProducts implements IOrdersProducts{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Order, order => order.order_products)
    @JoinColumn({name: 'order_id'})
    order: Order

    @ManyToOne(() => Product, product => product.order_products)
    @JoinColumn({name: 'product_id'})
    product: IProduct

    @Column()
    order_id: string

    @Column()
    product_id: string

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date


}

export default OrdersProducts;
