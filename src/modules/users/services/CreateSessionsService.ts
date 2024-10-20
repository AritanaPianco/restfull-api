import AppError from "@shared/errors/AppError";
import { Secret, sign } from "jsonwebtoken";
import authConfig from '@config/auth'
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUsersRepository";
import { IUser } from "../domain/models/IUser";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";

interface IRequest{
    email: string,
    password: string,

}

// aqui retorna o usuario com o token
interface IResponse{
     user: IUser,
     token: string
}

@injectable()
class CreateSessionService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider
      ){}
            // aqui tem duas regras de negocio
            // verificar se usuario existe pelo email
            // se usuario existe comparar sua password com a que ele digitou para fazer login
       public async execute({ email, password }: IRequest): Promise<IResponse>{
            const user = await this.usersRepository.findByEmail(email);

            if(!user){
                 throw new AppError('Incorrect email/password combination', 401)
            }

           const passwordConfirmed = await this.hashProvider.compareHash(password, user.password)

           if(!passwordConfirmed){
               throw new AppError('Incorrect email/password combination', 401)
           }


           const token = sign({}, authConfig.jwt.secret as Secret, {
                subject: user.id?.toString(),
                expiresIn: authConfig.jwt.expiresIn
           }) // criação do token chave de acesso para acessar as rotas -> autorização

           return {
              user,
              token
           };

       }

}


export default CreateSessionService;
