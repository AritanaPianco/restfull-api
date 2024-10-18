import "reflect-metadata";
import FakerUsersRepository from "../domain/repositories/fakes/fakerUsersRepository";
import AppError from "@shared/errors/AppError";
import DeleteUserService from "./DeleteUserService";

let fakerUsersRepository: FakerUsersRepository;
let deleteUser: DeleteUserService;

describe('DeleteUser', () => {

    beforeEach(() => {
        fakerUsersRepository = new FakerUsersRepository();
        deleteUser = new DeleteUserService(fakerUsersRepository);
    })

    it('should not be able to a non exist user', async () => {
        expect(
            deleteUser.execute({
            id: 5
        })
        ).rejects.toBeInstanceOf(AppError)
          
    })

    it('should be able to delete a user', async () => {
         const user = await fakerUsersRepository.create({
              name: 'ari',
              email: 'ari@gmail.com',
              password: "456"
         })

         expect(
            deleteUser.execute({id: user.id})
        ).resolves.not.toBeInstanceOf(AppError)

    })

})