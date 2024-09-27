import { getCustomRepository } from "typeorm"
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";
import path from "path";

interface IRequest{
    email: string,
}

class SendForgotPasswordEmailService{
       public async execute({ email }: IRequest): Promise<void>{
            const userRepository = getCustomRepository(UsersRepository);
            const userTokensRepository = getCustomRepository(UserTokensRepository)
            const user = await userRepository.findByEmail(email); // regra de negocio procurar se existe esse email em users

             if(!user){
                 throw new AppError('User does not exist')
             }

             //  console.log(user)
             const token = await userTokensRepository.generate(user.id);

             const forgotPasswordTemplate = path.resolve(__dirname, '..','views', 'forgot_password.hbs')
             //  console.log(token)
            await EtherealMail.sendMail({
                 to: {
                    name: user.name,
                    email: user.email
                 },
                 subject: '[API VENDAS] Recuperação de senha',
                 templateData: {
                      file: forgotPasswordTemplate,
                      variables: {
                          name: user.name,
                          link: `http://localhost:3000/reset_password?token=${token.token}`
                      }
                 }
            })

       }

}


export default SendForgotPasswordEmailService;
