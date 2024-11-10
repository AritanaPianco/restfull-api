import "reflect-metadata";
import FakerUsersRepository from "../domain/repositories/fakes/fakerUsersRepository";
import ResetPasswordService from "./ResetPasswordService";
import AppError from "@shared/errors/AppError";
import FakerUserTokensRepository from "../domain/repositories/fakes/fakerUserTokensRepository";
import FakerBcryptHashProvider from "../providers/HashProvider/fakes/FakerBcryptHashProvider";
import { addHours} from "date-fns";

let fakerUsersRepository: FakerUsersRepository;
let resetPassword: ResetPasswordService;
let fakerUsersTokenRepository: FakerUserTokensRepository
let fakerHashProvider: FakerBcryptHashProvider 

describe('ResetPassword', () => {

    beforeEach(() => {
        fakerUsersRepository = new FakerUsersRepository();
        fakerUsersTokenRepository = new FakerUserTokensRepository();
        fakerHashProvider = new FakerBcryptHashProvider();  
        resetPassword = new ResetPasswordService(fakerUsersRepository, fakerUsersTokenRepository, fakerHashProvider);

    })

    it('should not be able to reset a password to a user without token', async () => {
        const user = await fakerUsersRepository.create({
                    name:'ari',
                    email: 'ari@gmail.com',
                    password: '123'
                })
          expect(
              resetPassword.execute({
                   token: '',
                   password: user.password 
              })
          ).rejects.toBeInstanceOf(AppError)
          
    })

    it('should not be able to reset a password to a non exist user', async () => {
        const user = await fakerUsersRepository.create({
                    name:'ari',
                    email: 'ari@gmail.com',
                    password: '123'
                })

         const userToken = await fakerUsersTokenRepository.generate(user.id)       
         const userToken2 = await fakerUsersTokenRepository.generate('4')       

          expect(
              resetPassword.execute({
                   token: userToken2.token,
                   password: user.password 
              })
          ).rejects.toBeInstanceOf(AppError)

    })

    it('should throw an error if token is expired', async () => {
        const user = await fakerUsersRepository.create({
            name:'ari',
            email: 'ari@gmail.com',
            password: 'old-password'
        })

        const userToken = await fakerUsersTokenRepository.generate(user.id);
        const expiredTokenDate = addHours(new Date(), -3);
        userToken.created_at = expiredTokenDate; 

        
      expect(
          resetPassword.execute({
              token: userToken.token,
              password: 'new-password'
          })
      ).rejects.toBeInstanceOf(AppError)
        

    })

    it('should call generateHash method and save method', async () => {
        const user = await fakerUsersRepository.create({
            name:'ari',
            email: 'ari@gmail.com',
            password: '123'
        })

        const userToken = await fakerUsersTokenRepository.generate(user.id)
        const mockGenerateHash = jest.spyOn(fakerHashProvider, 'generateHash') 
        const mockSaveUser =  jest.spyOn(fakerUsersRepository, 'save')  
       

        await resetPassword.execute({
           token: userToken.token,
           password: '456'
        })

       expect(mockGenerateHash).toHaveBeenCalled()
       expect(mockSaveUser).toHaveBeenCalled()   

    })

  
})