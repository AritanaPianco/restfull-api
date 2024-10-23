import "reflect-metadata";
import FakerUsersRepository from "../domain/repositories/fakes/fakerUsersRepository";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";
import AppError from "@shared/errors/AppError";
import FakerUserTokensRepository from "../domain/repositories/fakes/fakerUserTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";

jest.mock("@config/mail/EtherealMail")


let fakerUsersRepository: FakerUsersRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;
let fakerUsersTokenRepository: FakerUserTokensRepository

describe('SendForgotPasswordEmail', () => {

    beforeEach(() => {
        fakerUsersRepository = new FakerUsersRepository();
        fakerUsersTokenRepository = new FakerUserTokensRepository();
        sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakerUsersRepository, fakerUsersTokenRepository);

    })

    it('should not be able to send a email to a non exist user', async () => {
         expect(
             sendForgotPasswordEmail.execute({
               email: 'maria@gmail.com'  
             })
         ).rejects.toBeInstanceOf(AppError)
          
    })

    it('should be able to send a email of forgot password', async () => {
         const sendEmail = jest.spyOn(EtherealMail,'sendMail')


          const user = await fakerUsersRepository.create({
               name: 'maria',
               email: 'maria@gmail.com',
               password: '234'
          })   
 
          await sendForgotPasswordEmail.execute({
               email: 'maria@gmail.com'
          })
          expect(sendEmail).toHaveBeenCalled()

    })
  
})