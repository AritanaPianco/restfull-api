import RedisCache from "@shared/cache/RedisCache";
import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import { IProduct } from "../domain/models/IProcuct";

@injectable()
class ListProductService{

    constructor(
        @inject('ProductRepository')
        private productsRepository: IProductsRepository
    ){}

    public async execute(): Promise<IProduct[]>{
        const redisCache = new RedisCache();

        await redisCache.invalidate('api-vendas-PRODUCT_LIST');
        const products = await this.productsRepository.findAllProducts()

        await redisCache.save('api-vendas-PRODUCT_LIST', products)
        console.log(products)

        return products;

   }

}


export default ListProductService;
