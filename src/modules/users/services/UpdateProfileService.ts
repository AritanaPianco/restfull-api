import AppError from '../../../shared/errors/AppError'
import {compare, hash} from 'bcryptjs';
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUsersRepository";
import { IUser } from "../domain/models/IUser";
// import { hash } from "crypto";

interface IRequest{
    user_id: number;
    name: string;
    email: string;
    password?: string;
    old_password?: string
}

@injectable()
class UpdateProfileService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository
      ){}


    public async execute({user_id, name, email, password, old_password}: IRequest): Promise<IUser>{
        const user = await this.usersRepository.findById(user_id);

        if(!user){
            throw new AppError("User not found");
        }

        const userUpdateEmail = await this.usersRepository.findByEmail(email);
        if(userUpdateEmail && userUpdateEmail.id !== user.id){
             throw new AppError('There is already one user with this email');
        }

        if(password && !old_password){
           throw new AppError("Old password is required");
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword){
                throw new AppError('Old password does not match')
            }

            user.password = await hash(password, 8);
        }

        user.name = name;
        user.email = email;

        await this.usersRepository.save(user);

        return user;

   }

}


export default UpdateProfileService;
