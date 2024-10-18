import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import { IOrdersProducts } from '@modules/orders/domain/models/IOrdersProducts';

@Entity('products')
class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => OrdersProducts, order_products => order_products.product)
    order_products: IOrdersProducts[]

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Product;