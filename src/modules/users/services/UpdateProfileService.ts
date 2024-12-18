import AppError from '../../../shared/errors/AppError'
import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "../domain/repositories/IUsersRepository";
import type { IUser } from "../domain/models/IUser";
import type { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

interface IRequest{
    user_id: string;
    name: string;
    email: string;
    password?: string;
    old_password?: string
}

@injectable()
class UpdateProfileService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider
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
            const checkOldPassword = await  this.hashProvider.compareHash(old_password, user.password);

            if(!checkOldPassword){
                throw new AppError('Old password does not match')
            }

            user.password = await this.hashProvider.generateHash(password, 8);
        }

        user.name = name;
        user.email = email;

        await this.usersRepository.save(user);

        return user;

   }

}


export default UpdateProfileService;
