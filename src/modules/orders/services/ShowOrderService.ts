import { getCustomRepository } from "typeorm"
import AppError from "@shared/errors/AppError";
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository";
import Order from "../typeorm/entities/Order";

interface IRequest{
    id: number;
}

class ShowOrderService{

       public async execute({id}: IRequest): Promise<Order>{
            const ordersRepository = getCustomRepository(OrdersRepository);

            const order = await ordersRepository.findById(id);

            if(!order){
                 throw new AppError('Order Not Found with this ID');
            }

            return order;


       }

}


export default ShowOrderService;
