import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id: number
}

class ShowUserService{

    public async execute({id}: IRequest): Promise<User>{
          const usersRepository = getCustomRepository(UsersRepository)

          const user = await usersRepository.findOne(id)

          if(!user){
              throw new AppError('user not found')
          }

          return user;
    }
}

export default ShowUserService;
