import "reflect-metadata";
import FakerUsersRepository from "../domain/repositories/fakes/fakerUsersRepository";
import UpdateUserService from "./UpdateUserService";
import AppError from "@shared/errors/AppError";

let fakerUsersRepository: FakerUsersRepository;
let updateUser: UpdateUserService;

describe('UpdateUser', () => {

    beforeEach(() => {
        fakerUsersRepository = new FakerUsersRepository();
        updateUser = new UpdateUserService(fakerUsersRepository);
    })

    it('should not be able to update a non exist user', async () => {
         expect(
            updateUser.execute({
                 id: '2',
                 name: 'maria',
                 email: 'maria@gmail.com',
                 password: '234'
            })
         ).rejects.toBeInstanceOf(AppError)
          
    })

    it('should not be able to update a user with duplicate emails', async () => {
        const user1 =  await fakerUsersRepository.create({
             name: 'maria',
             email: 'maria@gmail.com',
             password: '345'
        }) 

        const user2 = await fakerUsersRepository.create({
            name: 'joao',
            email: 'joao@gmail.com',
            password: '567'
        })

        expect(
           updateUser.execute({
                id: user2.id,
                name: 'joao silva',
                email: 'maria@gmail.com',
                password: '657'
           })
        ).rejects.toBeInstanceOf(AppError)
          
    })

    it('should be able to update a user', async () => {
         const user = await fakerUsersRepository.create({
              name: 'maria',
              email: 'maria@gmail.com',
              password: '234'
         })   
         
        const updatedUser = await updateUser.execute({
              id: user.id,
              name: 'maria silva', 
              email: 'mariSilva@gmail.com',
              password: '234'
         })
         expect(updatedUser.id).toEqual(user.id)

    })
  
})