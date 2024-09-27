import { getCustomRepository } from "typeorm"
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import {compare, hash} from 'bcryptjs'
import { sign } from "jsonwebtoken";
import authConfig from '@config/auth'

interface IRequest{
    email: string,
    password: string,

}

// aqui retorna o usuario com o token
interface IResponse{
     user: User,
     token: string
}

class CreateSessionService{
            // aqui tem duas regras de negocio
            // verificar se usuario existe pelo email
            // se usuario existe comparar sua password com a que ele digitou para fazer login
       public async execute({ email, password }: IRequest): Promise<IResponse>{
            const userRepository = getCustomRepository(UsersRepository);
            const user = await userRepository.findByEmail(email);

            if(!user){
                 throw new AppError('Incorrect email/password combination', 401)
            }

           const passwordConfirmed = await compare(password, user.password)

           if(!passwordConfirmed){
               throw new AppError('Incorrect email/password combination', 401)
           }

           const idUser = user.id.toString()

           const token = sign({}, authConfig.jwt.secret, {
                subject: idUser,
                expiresIn: authConfig.jwt.expiresIn
           }) // criação do token chave de acesso para acessar as rotas -> autorização

           return {
              user,
              token: token
           };

       }

}


export default CreateSessionService;
