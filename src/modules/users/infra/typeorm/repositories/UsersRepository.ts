import {Repository, getRepository} from 'typeorm'
import User from '../entities/User'
import { IUserRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUser } from '@modules/users/domain/models/IUser';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';



class UsersRepository implements IUserRepository{

     private ormRepository: Repository<User>;

    constructor(){
         this.ormRepository = getRepository(User)
    }

    public async create({name, email, password}: ICreateUser): Promise<IUser>{
        const user = this.ormRepository.create({
              name,
              email,
              password
        })

        await this.save(user)
        return user;
    }

    public async save(user: IUser): Promise<void>{
         await this.ormRepository.save(user)
    }

    public async findOneUser(id: string): Promise<IUser | undefined>{
        const userTarget = await this.ormRepository.findOne(id);

        return userTarget;
    }

    public async delete(user: IUser): Promise<void>{
          await this.ormRepository.remove(user)
    }

    public async findAllUsers(): Promise<IUser[]>{
           const users = await this.ormRepository.find();

           return users;
    }

    public async findByName(name: string): Promise<IUser | undefined>{
        const user = await this.ormRepository.findOne({
             where: {
                name
             }
        });

        return user;
    }


    public async findById(id: string): Promise<IUser | undefined>{
           const user = await this.ormRepository.findOne({
               where: {
                  id
              }
           })

           return user;
    }

    public async findByEmail(email: string): Promise<IUser | undefined>{
           const user = await this.ormRepository.findOne({
               where: {
                  email
              }
           })

           return user;
    }
}

export default UsersRepository;
