import { EntityRepository, Repository, In, getRepository } from 'typeorm'
import Product from '../entities/Product'
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IProduct } from '@modules/products/domain/models/IProcuct';
import { IUpdatedProduct } from '@modules/products/domain/models/IUpdatedProduct';

interface IFindProducts{
    id: number;
}

export class ProductRepository implements IProductsRepository{

    private ormRepository: Repository<Product>

    constructor(){
         this.ormRepository = getRepository(Product)
    }

    public async create({ name, price, quantity}: ICreateProduct): Promise<IProduct>{
          const product = this.ormRepository.create({
            name,
            price,
            quantity
          })

          await this.save(product);

          return product;
    }

    public async saveAndUpdate(product: IUpdatedProduct[]): Promise<void>{
        await this.ormRepository.save(product)
    }

    public async save(product: IProduct): Promise<IProduct>{
         const produto = await this.ormRepository.save(product);

         return produto;
    }

    public async findAllProducts(): Promise<IProduct[]>{
          const products = await this.ormRepository.find()

          return products;
    }

    public async findOneProduct(id: number): Promise<IProduct | undefined>{
          const product = await this.ormRepository.findOne(id);
          return product;
    }

    public async findByName(name: string): Promise<IProduct | undefined>{
          const product =  await this.ormRepository.findOne({
              where: {
                name,
              }
            });

           return product;
    }

    public async findAllByIds(products: IFindProducts[]): Promise<IProduct[] | undefined>{
          const productIds = products.map((product) => product.id);

          const existsProducts = await this.ormRepository.find({
             where: {
                id: In(productIds)
             }
          })

         return existsProducts;
    }


    public async delete(product: IProduct): Promise<void> {
        await this.ormRepository.remove(product)
    }

}
