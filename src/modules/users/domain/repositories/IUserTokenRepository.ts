import { IUserToken } from "../models/IUserToken";

export interface IUsersTokenRepositorie{
    findByToken( token: string): Promise<IUserToken | undefined>;
    generate(user_id: number): Promise<IUserToken>
}
