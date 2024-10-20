import UserToken from '@modules/users/infra/typeorm/entities/user_token'
import { IUsersTokenRepositorie } from '@modules/users/domain/repositories/IUserTokenRepository';
import { IUserToken } from '../../models/IUserToken';


class FakerUserTokensRepository implements IUsersTokenRepositorie{

     private usersToken: UserToken[] = [];
     private counter: number = 1;

    public async findByToken(token: string): Promise<IUserToken | undefined>{
        const userToken = this.usersToken.find((userWithToken) => userWithToken.token === token)

        return userToken;
    }


    public async generate(user_id: number): Promise<IUserToken>{
          const userToken = new UserToken()

          userToken.id = this.counter++
          userToken.user_id = user_id

          this.usersToken.push(userToken)

          return userToken;
    }


}

export default FakerUserTokensRepository;
