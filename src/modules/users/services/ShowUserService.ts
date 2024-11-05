import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "../domain/repositories/IUsersRepository";
import type { IUser } from "../domain/models/IUser";

interface IRequest{
    id: number
}

@injectable()
class ShowUserService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository
      ){}

    public async execute({id}: IRequest): Promise<IUser>{
          const user = await this.usersRepository.findOneUser(id)

          if(!user){
              throw new AppError('user not found')
          }

          return user;
    }
}

export default ShowUserService;
