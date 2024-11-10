import "reflect-metadata";
import FakerUsersRepository from "../domain/repositories/fakes/fakerUsersRepository";
import UpdateProfileService from "./UpdateProfileService";
import FakerBcryptHashProvider from "../providers/HashProvider/fakes/FakerBcryptHashProvider";
import AppError from "@shared/errors/AppError";

let fakerUsersRepository: FakerUsersRepository;
let updateProfile: UpdateProfileService;
let hashProvider: FakerBcryptHashProvider

describe('UpdateProfileUser', () => {

    beforeEach(() => {
        fakerUsersRepository = new FakerUsersRepository();
        hashProvider = new FakerBcryptHashProvider();
        updateProfile = new UpdateProfileService(fakerUsersRepository, hashProvider);

    })

    it('should not be able to update a non exist user', async () => {
         expect(
             updateProfile.execute({
               user_id: '3',
               name: 'maria',
               email: 'maria@gmail.com'  
             })
         ).rejects.toBeInstanceOf(AppError)
          
    })

    it('should not be able to update a user profile with duplicate emails', async () => {
          const user1 = await fakerUsersRepository.create({
               name: 'maria',
               email: 'maria@gmail.com',
               password: '234'
          })   
          const user2 = await fakerUsersRepository.create({
               name: 'joao',
               email: 'joao@gmail.com',
               password: '567'
          })   

          expect(
              updateProfile.execute({
                  user_id: user2.id,
                  name: 'joao silva',
                  email: 'maria@gmail.com'
              })
          ).rejects.toBeInstanceOf(AppError)
         

    })

    it('should not be able to update a user profile password without giving old password', async () => {
        const user = await fakerUsersRepository.create({
            name: 'maria',
            email: 'maria@gmail.com',
            password: '234'
        }) 

        expect(
             updateProfile.execute({
                  user_id: user.id,
                  name: 'maria silva',
                  email: 'mariaSilva@gmail.com',
                  password: '3243'
             }) 
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to update a user profile with wrong old password giving', async () => {
        const user = await fakerUsersRepository.create({
            name: 'maria',
            email: 'maria@gmail.com',
            password: '234'
        }) 

        expect(
            updateProfile.execute({
               user_id: user.id,
               name: 'maria silva',
               email: 'mariaSilva@gmail.com',
               password: '567',
               old_password: '67676'
           }) 
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to update a profile user', async () => {
        const user = await fakerUsersRepository.create({
            name: 'maria',
            email: 'maria@gmail.com',
            password: '234'
        }) 

        expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'maria silva',
                email: 'mariaSilva@gmail.com',
                password: '567',
                old_password: '234'
            }) 
        ).resolves.not.toBeInstanceOf(AppError)
    })

  
  
})