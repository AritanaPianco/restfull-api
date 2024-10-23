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

    it('should not be able to create a user with an email that allready exist', async () => {
        const user1 = await fakerUsersRepository.create({
            name: 'Jorge Luiz',
            email: 'teste@gmail.com',
            password: '123456'
        })
        expect(
            createUser.execute({
                name: 'Maria',
                email: 'teste@gmail.com',
                password: '1234'
            })
        ).rejects.toBeInstanceOf(AppError)

    })

    it('should call the generateHash method and should be able to create a user', async () => {

     expect(createUser.execute({
            name: 'Maria',
            email: 'teste@gmail.com',
            password: '1234'
        })).resolves.not.toBeInstanceOf(AppError)

    })

})
