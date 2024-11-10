import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";
import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import { IProduct } from "../domain/models/IProcuct";

interface IRequest{
    id: string,
    name: string,
    price: number,
    quantity: number
}

@injectable()
class UpdateProductService{

    constructor(
        @inject('ProductRepository')
        private productsRepository: IProductsRepository
    ){}

    public async execute({ id, name, price, quantity }: IRequest): Promise<IProduct>{
        const product = await this.productsRepository.findOneProduct(id)

        if(!product){
            throw new AppError('Product not found')
        }

        const productExists = await this.productsRepository.findByName(name);

        if(productExists &&  name !== product.name){
             throw new AppError('There is already one product with this name')
        }

        const redisCache = new RedisCache();

        await redisCache.invalidate('api-vendas-PRODUCT_LIST');

         product.name = name;
         product.price = price;
         product.quantity = quantity

        await this.productsRepository.save(product)

        return product;
    }

}


export default UpdateProductService;
