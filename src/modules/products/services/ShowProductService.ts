import AppError from "@shared/errors/AppError";
import type { IProduct } from "../domain/models/IProcuct";
import { inject, injectable } from "tsyringe";
import type { IProductsRepository } from "../domain/repositories/IProductsRepository";

interface IRequest{
    id: string
}

@injectable()
class ShowProductService{
    constructor(
        @inject('ProductRepository')
        private productsRepository: IProductsRepository
    ){}

    public async execute({id}: IRequest): Promise<IProduct | undefined>{
        const product = await this.productsRepository.findOneProduct(id)

        if(!product){
            throw new AppError('Product not found')
        }

        return product;
    }

}


export default ShowProductService;
