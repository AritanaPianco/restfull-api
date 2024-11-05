import AppError from '../../../shared/errors/AppError'
import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "../domain/repositories/IUsersRepository";
import type { IUser } from "../domain/models/IUser";

interface IRequest{
    user_id: number;
}

@injectable()
class ShowProfileService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository
      ){}

    public async execute({user_id}: IRequest): Promise<IUser>{
        const user = await this.usersRepository.findById(user_id);

        if(!user){
            throw new AppError("User not found");

        }

        return user;

   }

}


export default ShowProfileService;
