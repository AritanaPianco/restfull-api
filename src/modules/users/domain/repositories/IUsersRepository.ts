import { ICreateUser } from "../models/ICreateUser";
import { IUser } from "../models/IUser";

export interface IUserRepository{
    findByName(name: string): Promise<IUser | undefined>;
    findById(id: number): Promise<IUser | undefined>;
    findByEmail(email: string): Promise<IUser | undefined>;
    create({name, email, password}: ICreateUser): Promise<IUser>;
    save(user: IUser): Promise<void>;
    findOneUser(id: number): Promise<IUser | undefined>;
    delete(user: IUser): Promise<void>;
    findAllUsers(): Promise<IUser[]>;

}
