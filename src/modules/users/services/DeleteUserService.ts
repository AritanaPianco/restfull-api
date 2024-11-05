import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "../domain/repositories/IUsersRepository";


interface IRequest{
    id: number
}

@injectable()
class DeleteUserService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository
      ){}

         public async execute({id}: IRequest): Promise<[]>{
               const user = await this.usersRepository.findOneUser(id)

               if(!user){
                   throw new AppError('user not found')
               }

               await this.usersRepository.delete(user)

               return [];
         }
}

export default DeleteUserService;
