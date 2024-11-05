import "reflect-metadata";
import AppError from "@shared/errors/AppError";
import type { IOrdersRepository } from "../domain/repositories/IOrdersRepository";
import { inject, injectable } from "tsyringe";
import type { IOrder } from "../domain/models/IOrder";

interface IRequest{
    id: number;
}

@injectable()
class ShowOrderService{

     constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository
     ){}

       public async execute({id}: IRequest): Promise<IOrder>{
            const order = await this.ordersRepository.findById(id);

            if(!order){
                 throw new AppError('Order Not Found with this ID');
            }

            return order;
       }

}


export default ShowOrderService;
