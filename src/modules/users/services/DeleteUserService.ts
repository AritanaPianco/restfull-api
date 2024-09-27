import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";


interface IRequest{
    id: number
}


class DeleteUserService{
         public async execute({id}: IRequest): Promise<[]>{
               const usersRepository = getCustomRepository(UsersRepository);

               const user = await usersRepository.findOne(id)

               if(!user){
                   throw new AppError('user not found')
               }

               await usersRepository.remove(user)

               return [];
         }
}

export default DeleteUserService;
