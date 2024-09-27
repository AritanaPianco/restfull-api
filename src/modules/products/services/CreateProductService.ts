import { getCustomRepository } from "typeorm"
import { ProductRepository } from "../typeorm/repositories/ProductsRepository"
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";


interface IRequest{
    name: string,
    price: number,
    quantity: number

}


class CreateProductService{

       public async execute({name, price, quantity}: IRequest): Promise<Product>{ // vou ter uma promessa de retorno de um objeto do tipo Product
            const productsRepository = getCustomRepository(ProductRepository);
            const productExists = await productsRepository.findByName(name);

            if(productExists){
                 throw new AppError('There is already one product with this name') // criando uma nova instancia de AppError por meio do constructor
            }

           const product = productsRepository.create({
                name,
                price,
                quantity
           })

           await productsRepository.save(product);

           return product;

       }

}


export default CreateProductService;
