import { getCustomRepository } from "typeorm"
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import path from "path";
import uploadConfig from '@config/upload'
import fs from 'fs'

interface IRequest{
    user_id: number,
    avatarFilename: string
}


class UpdateUserAvatarService{
       public async execute({ user_id, avatarFilename }: IRequest): Promise<User>{ 
            const userRepository = getCustomRepository(UsersRepository);

            const user = await userRepository.findById(user_id)

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

            await userRepository.save(user)

            return user;

       }

}


export default UpdateUserAvatarService;
