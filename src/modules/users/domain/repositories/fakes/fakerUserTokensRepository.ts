import UserToken from '@modules/users/infra/typeorm/entities/user_token'
import { IUsersTokenRepositorie } from '@modules/users/domain/repositories/IUserTokenRepository';
import { IUserToken } from '../../models/IUserToken';
import {v4 as uuidv4} from 'uuid';

class FakerUserTokensRepository implements IUsersTokenRepositorie{

     private usersToken: UserToken[] = [];
     private counter: number = 1;

    public async findByToken(token: string): Promise<IUserToken | undefined>{
        const userToken = this.usersToken.find((userWithToken) => userWithToken.token === token)

        return userToken;
    }


    public async generate(user_id: string): Promise<IUserToken>{
          const userToken = new UserToken()

          userToken.id = uuidv4()
          userToken.user_id = user_id

          this.usersToken.push(userToken)

          return userToken;
    }


}

export default FakerUserTokensRepository;
