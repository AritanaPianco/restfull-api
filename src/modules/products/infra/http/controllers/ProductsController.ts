import {Request,Response} from 'express'
import ListProductService from '../../../services/ListProductService'
import ShowProductService from '../../../services/ShowProductService';
import CreateProductService from '../../../services/CreateProductService';
import UpdateProductService from '../../../services/UpdateProductService';
import DeleteProductService from '../../../services/DeleteProductService';
import { container } from 'tsyringe';


export default class ProductsController{

     public async index(request: Request, response: Response): Promise<Response>{
           const listProducts = container.resolve(ListProductService);
           const products = await listProducts.execute();

           return response.json(products)
     }


     public async show(request: Request, response: Response): Promise<Response>{
         const id = parseInt(request.params.id);
         const showProduct = container.resolve(ShowProductService);
         const product = await showProduct.execute({id})

         return response.json(product)
     }

     public async create(request: Request, response: Response): Promise<Response>{
          const {name, price, quantity} = request.body;

          const createProduct = container.resolve(CreateProductService);
          const product = await createProduct.execute({name, price, quantity})

          return response.json(product)

     }

     public async update(request: Request, response: Response): Promise<Response>{
          const {name,price, quantity} = request.body;
          const id = parseInt(request.params.id)

          const updateProduct = container.resolve(UpdateProductService);
          const product = await updateProduct.execute({id, name, price, quantity})

           return response.json(product)

     }


     public async delete(request: Request, response: Response): Promise<Response>{
        const id = parseInt(request.params.id)

        const deleteProduct = container.resolve(DeleteProductService);
        const product = await deleteProduct.execute({id});

        return response.json([])

     }

}