import { IHashProvider } from "../models/IHashProvider";
import {compare, hash} from 'bcryptjs';


class BcryptHashProvider implements IHashProvider{
    public async generateHash(payload: string, quantity: number): Promise<string>{
         return hash(payload, 8);
    }


    public async compareHash(payload: string, hashed: string): Promise<boolean>{
          return compare(payload, hashed);
    }

}

export default BcryptHashProvider;
