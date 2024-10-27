import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";
import type { IProduct } from "../domain/models/IProcuct";
import type { ICreateProduct } from "../domain/models/ICreateProduct";
import type { IProductsRepository } from "../domain/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class CreateProductService{

      constructor(
        @inject('ProductRepository')
        private productsRepository: IProductsRepository
      ){}

       public async execute({name, price, quantity}: ICreateProduct): Promise<IProduct>{ // vou ter uma promessa de retorno de um objeto do tipo Product
            const productExists = await this.productsRepository.findByName(name);

            if(productExists){
                 throw new AppError('There is already one product with this name') // criando uma nova instancia de AppError por meio do constructor
            }

           const redisCache = new RedisCache();

           const product = this.productsRepository.create({
                name,
                price,
                quantity
           })

           await redisCache.invalidate('api-vendas-PRODUCT_LIST');

           return product;

       }

}


export default CreateProductService;
