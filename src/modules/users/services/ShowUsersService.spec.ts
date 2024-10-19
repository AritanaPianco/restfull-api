import "reflect-metadata";
import FakerUsersRepository from "../domain/repositories/fakes/fakerUsersRepository";
import ShowUserService from "./ShowUserService";
import AppError from "@shared/errors/AppError";

let fakerUsersRepository: FakerUsersRepository;
let showUser: ShowUserService;

describe('ShowUser', () => {

    beforeEach(() => {
        fakerUsersRepository = new FakerUsersRepository();
        showUser = new ShowUserService(fakerUsersRepository);
    })

    it('should not be able to show a non exist user', async () => {
         expect(
             showUser.execute({
               id: 3
             })
         ).rejects.toBeInstanceOf(AppError)
          
    })

    it('should be able to return a user', async () => {
          const user = await fakerUsersRepository.create({
               name: 'maria',
               email: 'maria@gmail.com',
               password: '234'
          })   
         
         const userToShow = await showUser.execute({id: user.id})
         expect(userToShow.id).toEqual(user.id)

    })
  
})