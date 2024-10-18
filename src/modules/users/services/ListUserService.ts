import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUsersRepository";
import { IUser } from "../domain/models/IUser";


@injectable()
class ListUserService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository
      ){}

    public async execute(): Promise<IUser[]>{
        const users = await this.usersRepository.findAllUsers()

        return users;

   }

}


export default ListUserService;
