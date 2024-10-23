import AppError from "@shared/errors/AppError";
import { ICreateUser } from "../domain/models/ICreateUser";
import { IUserRepository } from "../domain/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { IUser } from "../domain/models/IUser";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";


@injectable()
class CreateUserService{

      constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider
      ){}

       public async execute({ name, email, password }: ICreateUser): Promise<IUser>{ // vou ter uma promessa de retorno de um objeto do tipo Product
            const emailExists = await this.usersRepository.findByEmail(email);

            if(emailExists){
                 throw new AppError('There is already one user with this email') // criando uma nova instancia de AppError por meio do constructor
            }

           const hashedPassword = await this.hashProvider.generateHash(password, 8)

           const user = await this.usersRepository.create({
                name,
                email,
                password: hashedPassword,
           })


           return user;

       }

}


export default CreateUserService;
