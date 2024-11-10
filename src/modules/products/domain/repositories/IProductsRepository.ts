import { IProduct } from "../models/IProcuct";
import { ICreateProduct } from "../models/ICreateProduct";
import { IUpdatedProduct } from "../models/IUpdatedProduct";

interface IFindProducts{
    id: string;
}

export interface IProductsRepository{
    findByName(name: string): Promise<IProduct | undefined>;
    findAllByIds(products: IFindProducts[]): Promise<IProduct[] | undefined>;
    create( { name, price, quantity}: ICreateProduct): Promise<IProduct>;
    save(product: IProduct): Promise<IProduct>;
    delete(product: IProduct): Promise<void>;
    findAllProducts(): Promise<IProduct[]>;
    findOneProduct(id: string): Promise<IProduct | undefined>;
    saveAndUpdate(product: IUpdatedProduct[]): Promise<void>
}
