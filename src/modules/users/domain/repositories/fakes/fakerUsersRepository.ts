// import {v4 as uuidv4 } from 'uuid';
import User from '../../../infra/typeorm/entities/User'
import { IUserRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUser } from '@modules/users/domain/models/IUser';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';



class FakerUsersRepository implements IUserRepository{

    private users: User[] = [];
    private counter: number = 1;

    public async create({name, email, password}: ICreateUser): Promise<IUser>{
        const user = new User();

        user.id = this.counter++;
        user.name = name;
        user.email = email;
        user.password = password;
        this.users.push(user);
        return user;
    }

    public async save(user: IUser): Promise<void>{
         const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
         this.users[findIndex] = user;
    }

    public async findOneUser(id: number): Promise<IUser | undefined>{
          const user = this.users.find(user => user.id == id);
          return user;
    }

    public async delete(user: IUser): Promise<void>{
         const findIndex = this.users.findIndex(findUser => findUser.id === user.id)
         this.users.splice(findIndex, 1);
    }

    public async findAllUsers(): Promise<IUser[]>{
          return this.users;
    }

    public async findByName(name: string): Promise<IUser | undefined>{
        const user = this.users.find(user => user.name === name);
        return user;
    }


    public async findById(id: number): Promise<IUser | undefined>{
           const user = this.users.find(user => user.id === id);
           return user;
    }

    public async findByEmail(email: string): Promise<IUser | undefined>{
           const user = this.users.find(user => user.email === email);
           return user;
    }
}

export default FakerUsersRepository;
