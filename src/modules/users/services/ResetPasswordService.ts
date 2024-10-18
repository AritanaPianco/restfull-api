import { getCustomRepository } from "typeorm"
import AppError from "@shared/errors/AppError";
import UserTokensRepository from "../infra/typeorm/repositories/UserTokensRepository";
import {isAfter, addHours} from 'date-fns'
import {hash} from 'bcryptjs'
import { IUserRepository } from "../domain/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { IUser } from "../domain/models/IUser";

interface IRequest{
    token: string,
    password: string,
}

@injectable()
class ResetPasswordService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository
      ){}

    public async execute({ token, password }: IRequest): Promise<IUser>{
        const userTokensRepository = getCustomRepository(UserTokensRepository)

        const userToken = await userTokensRepository.findByToken(token);

            if(!userToken){
                throw new AppError('User Token does not exist')
            }

         const user = await this.usersRepository.findById(userToken.user_id);

         if(!user){
            throw new AppError('User does not exist')
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt,2)

        if(isAfter(Date.now(),compareDate)){
            throw new AppError('Token expired.')
        }

         user.password = await hash(password, 8);
         await this.usersRepository.save(user);
         return user;

    }

}


export default ResetPasswordService;
