import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import type { IUpdateUser } from "../domain/models/IUpdateUser";
import type { IUser } from "../domain/models/IUser";
import type { IUserRepository } from "../domain/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class UpdateUserService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository
      ){}

     public async execute({id, name, email, password}: IUpdateUser): Promise<IUser>{
           const user = await this.usersRepository.findById(id);

           if(!user){
               throw new AppError('user not found')
           }

           const emailExist = await this.usersRepository.findByEmail(email)

           //se o email for o meu ele não vai deixar atualizar se eu quiser manter o email e atualizar o resto dos atributos
           if(emailExist &&  email !== user.email){ 
               throw new AppError('there is already one user with this email')
           }

           const hashedPassword = await hash(password, 10)

           user.name = name;
           user.email = email;
           user.password = hashedPassword

           await this.usersRepository.save(user)

           return user;

     }

}


export default UpdateUserService;
