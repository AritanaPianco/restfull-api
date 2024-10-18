import { getCustomRepository } from "typeorm"
import AppError from "@shared/errors/AppError";
import { OrdersRepository } from "../infra/typeorm/repositories/OrdersRepository";
import Order from "../infra/typeorm/entities/Order";
import { ProductRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import CustomersRepository from "@modules/customers/infra/typeorm/repositories/CustomersRepository";
import { IOrdersRepository } from "../domain/repositories/IOrdersRepository";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersReporitory";
import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "@modules/products/domain/repositories/IProductsRepository";
import { IUpdatedProduct } from "@modules/products/domain/models/IUpdatedProduct";

interface IProduct{
    id: number;
    quantity: number
}

interface IRequest{
    customer_id: number;
    products: IProduct[];
}


@injectable()
class CreateOrderService{

       constructor(
         @inject('OrdersRepository')
           private ordersRepository: IOrdersRepository,
         @inject('CustomersRepository')
           private customersRepository: ICustomersRepository,
         @inject('ProductRepository')
           private productsRepository: IProductsRepository
       ){}

       public async execute({customer_id, products}: IRequest): Promise<Order>{
            // const ordersRepository = getCustomRepository(OrdersRepository);
            // const productsRepository = getCustomRepository(ProductRepository);
            // const customersRepository = getCustomRepository(CustomersRepository);

            try {

                const customerExist = await this.customersRepository.findById(customer_id);

                if(!customerExist){
                     throw new AppError('Customer Not Found with this ID');
                }

                const existsProducts = await this.productsRepository.findAllByIds(products);

                if(!existsProducts?.length){
                     throw new AppError('Could not find any products with the given ids.')
                }

                const existsProductsIds = existsProducts.map(product => product.id);

                const checkInexistentProducts = products.filter(product => !existsProductsIds.includes(product.id))

                if(checkInexistentProducts.length){
                    throw new AppError(`Could not find product: ${checkInexistentProducts[0].id}`)
                }

                const quantityAvailable = products.filter(product =>
                     existsProducts.filter(p => p.id === product.id)[0].quantity < product.quantity
                )

                if(quantityAvailable.length){
                    throw new AppError(
                        `The quantity ${quantityAvailable[0].quantity}
                         is not available for ${quantityAvailable[0].id}
                        `
                    )
                }

                const seializedProducts = products.map(product => ({
                     product_id: product.id,
                     quantity: product.quantity,
                     price: existsProducts.filter(p => p.id === product.id)[0].price
                }))

               const order = await this.ordersRepository.createOrder({
                   customer: customerExist,
                   products: seializedProducts
               })

               const {order_products} = order;

               const updatedProductQuantity: IUpdatedProduct[] = order_products.map(product => ({
                  id: product.product_id,
                  quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity
               }))

               console.log(updatedProductQuantity);

               await this.productsRepository.saveAndUpdate(updatedProductQuantity);
               return order;
            } catch (error) {
                console.error(error);
                throw new AppError('Internal Server Error');
            }


       }

}


export default CreateOrderService;
