import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";
import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";

interface IRequest{
    id: number
}

@injectable()
class DeleteProductService{

    constructor(
        @inject('ProductRepository')
        private productsRepository: IProductsRepository){
    }

    public async execute({id}: IRequest): Promise<void>{
        const product = await this.productsRepository.findOneProduct(id)

        if(!product){
            throw new AppError('Product not found')
        }

        const redisCache = new RedisCache();

        await redisCache.invalidate('api-vendas-PRODUCT_LIST');

        await this.productsRepository.delete(product)

    }

}


export default DeleteProductService;