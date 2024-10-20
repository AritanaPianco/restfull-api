import "reflect-metadata";
import FakerUsersRepository from "../domain/repositories/fakes/fakerUsersRepository";
import ShowProfileService from "./ShowProfileService";
import AppError from "@shared/errors/AppError";

let fakerUsersRepository: FakerUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfileUser', () => {

    beforeEach(() => {
        fakerUsersRepository = new FakerUsersRepository();
        showProfile = new ShowProfileService(fakerUsersRepository);
    })

    it('should not be able to show a non exist user profile', async () => {
         expect(
             showProfile.execute({
               user_id: 3,
             })
         ).rejects.toBeInstanceOf(AppError)
          
    })

    it('should be able to show a user profile', async () => {
          const user = await fakerUsersRepository.create({
               name: 'maria',
               email: 'maria@gmail.com',
               password: '234'
          })   
         
          expect(
              showProfile.execute({
                  user_id: user.id,
              })
          ).resolves.not.toBeInstanceOf(AppError)
         
    })
 
})