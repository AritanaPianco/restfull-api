import AppError from "@shared/errors/AppError";
import path from "path";
import uploadConfig from '@config/upload'
import fs from 'fs'
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUsersRepository";
import { IUser } from "../domain/models/IUser";

interface IRequest{
    user_id: number,
    avatarFilename: string
}

@injectable()
class UpdateUserAvatarService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository
      ){}

       public async execute({ user_id, avatarFilename }: IRequest): Promise<IUser>{
            const user = await this.usersRepository.findById(user_id)

            if(!user){
               throw new AppError('user not found')
            }

            if(user.avatar){
                 const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
                 const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

                 if(userAvatarFileExists){
                     await fs.promises.unlink(userAvatarFilePath)
                 }
            }

            user.avatar = avatarFilename;

            await this.usersRepository.save(user)

            return user;

       }

}


export default UpdateUserAvatarService;
