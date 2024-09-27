import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";




interface IRequest{
    id: number,
    name: string,
    email: string,
    password: string
}


class UpdateUserService{
     public async execute({id, name, email, password}: IRequest): Promise<User>{
           const usersRepository = getCustomRepository(UsersRepository)

           const user = await usersRepository.findById(id);

           if(!user){
               throw new AppError('user not found')
           }

           const emailExist = await usersRepository.findByEmail(email)

           if(emailExist &&  email !== user.email){ //se o email for o meu ele não vai deixar atualizar se eu quiser manter o email e atualizar o resto dos atributos
               throw new AppError('there is already one user with this email')
           }

           const hashedPassword = await hash(password, 10)

           user.name = name;
           user.email = email;
           user.password = hashedPassword

           await usersRepository.save(user)

           return user;



     }

}


export default UpdateUserService;
