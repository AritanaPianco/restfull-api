import "reflect-metadata";
import FakerUsersRepository from "../domain/repositories/fakes/fakerUsersRepository";
import ShowProfileService from "./ShowProfileService";
import UpdateUserAvatarService from "./UpdateUserAvatarService";
import AppError from "@shared/errors/AppError";


let fakerUsersRepository: FakerUsersRepository;
let updateUserAvatar: UpdateUserAvatarService;


describe('UpdateUserAvatar', () => {

    beforeEach(() => {
        fakerUsersRepository = new FakerUsersRepository();
        updateUserAvatar = new UpdateUserAvatarService(fakerUsersRepository);
    })

    it('should not be able to update a avatar of a non exist user', async () => {
         expect(
             updateUserAvatar.execute({
               user_id: '3',
               avatarFilename: 'avatar.png'
             })
         ).rejects.toBeInstanceOf(AppError)
          
    })

    

    it('should be able to update a user avatar', async () => {
          const user = await fakerUsersRepository.create({
               name: 'maria',
               email: 'maria@gmail.com',
               password: '234'
          })   
         
         const userWithAvatarUpdated = await updateUserAvatar.execute({
              user_id: user.id,
              avatarFilename: 'avatar.png'
          })
          expect(userWithAvatarUpdated.id).toEqual(user.id)
         
    })

   

})