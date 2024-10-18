import "reflect-metadata";
import FakerUsersRepository from "../domain/repositories/fakes/fakerUsersRepository";
import ListUserService from "./ListUserService";

let fakerUsersRepository: FakerUsersRepository;
let listUsers: ListUserService;

describe('ListUsers', () => {

    beforeEach(() => {
        fakerUsersRepository = new FakerUsersRepository();
        listUsers = new ListUserService(fakerUsersRepository);
    })

    it('should be able to return all users', async () => {
        await fakerUsersRepository.create({
             name: 'maria',
             email: 'maria@gmail.com',
             password: '345'
        }) 

        await fakerUsersRepository.create({
            name: 'joao',
            email: 'joao@gmail.com',
            password: '567'
        })

        expect(
           listUsers.execute()
        ).resolves.toBeInstanceOf(Array)
          
    })
  
})