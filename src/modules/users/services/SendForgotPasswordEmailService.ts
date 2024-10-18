import { getCustomRepository } from "typeorm"
import AppError from "@shared/errors/AppError";
import UserTokensRepository from "../infra/typeorm/repositories/UserTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";
import path from "path";
import { IUserRepository } from "../domain/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IRequest{
    email: string,
}

@injectable()
class SendForgotPasswordEmailService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
      ){}

       public async execute({ email }: IRequest): Promise<void>{
            const userTokensRepository = getCustomRepository(UserTokensRepository)
            const user = await this.usersRepository.findByEmail(email); // regra de negocio procurar se existe esse email em users

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
                          link: `${process.env.APP_WEB_URL}/reset_password?token=${token.token}`
                      }
                 }
            })

       }

}


export default SendForgotPasswordEmailService;
