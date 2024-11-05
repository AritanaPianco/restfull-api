import AppError from "@shared/errors/AppError";
import {isAfter, addHours} from 'date-fns'
import {hash} from 'bcryptjs'
import type { IUserRepository } from "../domain/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import type { IUser } from "../domain/models/IUser";
import type { IUsersTokenRepositorie } from "../domain/repositories/IUserTokenRepository";
import type { IHashProvider } from "../providers/HashProvider/models/IHashProvider";

interface IRequest{
    token: string,
    password: string,
}

@injectable()
class ResetPasswordService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
        @inject('UserTokensRepository')
        private userTokensRepository: IUsersTokenRepositorie,
        @inject('HashProvider')
        private hashProvider: IHashProvider
      ){}

    public async execute({ token, password }: IRequest): Promise<IUser>{

        const userToken = await this.userTokensRepository.findByToken(token);

            if(!userToken){
                throw new AppError('User Token does not exist')
            }

         const user = await this.usersRepository.findById(userToken.user_id);

         if(!user){
            throw new AppError('User does not exist')
         }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt,2)
        const isAfterTheHourPermited = isAfter(Date.now(),compareDate)

        if(isAfterTheHourPermited){
            throw new AppError('Token expired.')
        }

         user.password = await this.hashProvider.generateHash(password, 8);
         await this.usersRepository.save(user);
         return user;

    }

}


export default ResetPasswordService;
