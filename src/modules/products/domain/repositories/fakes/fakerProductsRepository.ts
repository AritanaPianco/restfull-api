import Product from '@modules/products/infra/typeorm/entities/Product';
import type { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import type { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import type { IProduct } from '@modules/products/domain/models/IProcuct';
import type { IUpdatedProduct } from '@modules/products/domain/models/IUpdatedProduct';

interface IFindProducts{
    id: number;
}

export class FakerProductRepository implements IProductsRepository{

    private products: Product[] = [];  
    private counter = 1
  
    public async create({ name, price, quantity}: ICreateProduct): Promise<IProduct>{
           const product = new Product();
          
           product.id = this.counter++
           product.name = name;
           product.price = price;
           product.quantity = quantity;
           
           this.products.push(product)
           return product;
    }

    public async saveAndUpdate(product: IUpdatedProduct[]): Promise<void>{
        this.products.map((oldProduto) => {
             product.map((updatedProduct) => {
                   if(oldProduto.id === updatedProduct.id){
                        oldProduto.quantity = updatedProduct.quantity    
                   }
             })
        })
        
     
    }

    public async save(product: IProduct): Promise<IProduct>{
      const findIndex = this.products.findIndex(findProduct => findProduct.id === product.id);
      this.products[findIndex] = product;

      return product;
    }

    public async findAllProducts(): Promise<IProduct[]>{
          return this.products;
    }

    public async findOneProduct(id: number): Promise<IProduct | undefined>{
          const product = this.products.find(product => product.id === id)
          return product;
    }

    public async findByName(name: string): Promise<IProduct | undefined>{
           const product = this.products.find(product => product.name === name)
           return product;
    }

    public async findAllByIds(products: IFindProducts[]): Promise<IProduct[] | undefined>{
            const productIds = products.map((product) => product.id);
            const existsProducts: IProduct[] = []        
 
            this.products.forEach((product, i) => {
                  for(const id of productIds){
                    if(id === product.id){
                        existsProducts.push(product)                

                    }
                  }
            })
          
         return existsProducts;
    }


    public async delete(product: IProduct): Promise<void> {
       const findIndex = this.products.findIndex((produto) => produto.id === product.id)
       this.products.splice(findIndex, 1)
    }

}
