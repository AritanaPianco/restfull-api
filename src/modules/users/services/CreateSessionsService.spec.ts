import "reflect-metadata";
import FakerBcryptHashProvider from "../providers/HashProvider/fakes/FakerBcryptHashProvider";
import CreateUserService from "./CreateUserService";
import FakerUsersRepository from "../domain/repositories/fakes/fakerUsersRepository";
import AppError from "@shared/errors/AppError";
import CreateSessionService from "./CreateSessionsService";

let fakerUsersRepository: FakerUsersRepository;
let createSession: CreateSessionService;
let hashProvider: FakerBcryptHashProvider

describe('CreateSession', () => {

    beforeEach(() => {
        fakerUsersRepository = new FakerUsersRepository();
        hashProvider = new FakerBcryptHashProvider();
        createSession = new CreateSessionService(fakerUsersRepository, hashProvider);
    })

    it('should be able to authenticate', async () => {

        const user = await fakerUsersRepository.create({
            name: 'Otavio',
            email: 'otavio@gmail.com',
            password: '234'
        })

        const response = await createSession.execute({
           email: 'otavio@gmail.com',
           password: '234'
        })

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);

    })

    it('should not be able to authenticate with non existent user', async () => {
            expect(createSession.execute({
                email: 'teste@gmail.com',
                password: '123456'
            })).rejects.toBeInstanceOf(AppError);

    })

    it('should not be able to authenticate with wrong password', async () => {
            const user = await fakerUsersRepository.create({
                name: 'Otavio',
                email: 'otavio@gmail.com',
                password: '234'
            })

            expect(createSession.execute({
                email: 'otavio@gmail.com',
                password: '234455'
            })).rejects.toBeInstanceOf(AppError);

    })

})
