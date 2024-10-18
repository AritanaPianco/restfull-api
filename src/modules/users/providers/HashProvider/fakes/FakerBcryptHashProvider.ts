import { IHashProvider } from "../models/IHashProvider";

class FakerBcryptHashProvider implements IHashProvider{
    public async generateHash(payload: string, quantity: number): Promise<string>{
         return payload;
    }

    public async compareHash(payload: string, hashed: string): Promise<boolean>{
          return payload === hashed;
    }

}

export default FakerBcryptHashProvider;
