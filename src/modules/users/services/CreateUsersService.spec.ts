import "reflect-metadata";
import FakerBcryptHashProvider from "../providers/HashProvider/fakes/FakerBcryptHashProvider";
import CreateUserService from "./CreateUserService";
import FakerUsersRepository from "../domain/repositories/fakes/fakerUsersRepository";
import AppError from "@shared/errors/AppError";

let fakerUsersRepository: FakerUsersRepository;
let createUser: CreateUserService;
let hashProvider: FakerBcryptHashProvider

describe('CreateUser', () => {

    beforeEach(() => {
        fakerUsersRepository = new FakerUsersRepository();
        hashProvider = new FakerBcryptHashProvider();
        createUser = new CreateUserService(fakerUsersRepository, hashProvider);
    })

    it('should be able to create a new user', async () => {

        const user = await createUser.execute({
            name: 'Jorge Luiz',
            email: 'teste@gmail.com',
            password: '123456'
        })

        expect(user).toHaveProperty('id');
    })

    it('should not be able to create a new user with the same email as others', async () => {
         await createUser.execute({
            name: 'Jorge Luiz',
            email: 'teste@gmail.com',
            password: '123456'
         })

         expect(
            createUser.execute({
              name: 'Jorge Luiz',
              email: 'teste@gmail.com',
              password: '123456'
         })).rejects.toBeInstanceOf(AppError)

    })

})
