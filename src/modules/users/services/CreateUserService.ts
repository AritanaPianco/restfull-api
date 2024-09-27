import { getCustomRepository } from "typeorm"
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import {hash} from 'bcryptjs'


interface IRequest{
    name: string,
    email: string,
    password: string,
    // avatar?:string

}


class CreateUserService{

       public async execute({ name, email, password }: IRequest): Promise<User>{ // vou ter uma promessa de retorno de um objeto do tipo Product
            const userRepository = getCustomRepository(UsersRepository);
            const emailExists = await userRepository.findByEmail(email);

            if(emailExists){
                 throw new AppError('There is already one user with this email') // criando uma nova instancia de AppError por meio do constructor
            }


           const hashedPassword = await hash(password, 10)

           const user =  userRepository.create({
                name,
                email,
                password: hashedPassword,
           })

           await userRepository.save(user);

           return user;

       }

}


export default CreateUserService;
