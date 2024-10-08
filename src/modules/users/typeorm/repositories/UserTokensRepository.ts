import {EntityRepository, Repository} from 'typeorm'
import UserToken from '@modules/users/typeorm/entities/user_token'

@EntityRepository(UserToken)
class UserTokensRepository extends Repository<UserToken>{
    public async findByToken( token: string): Promise<UserToken | undefined>{
        const userToken = await this.findOne({
             where: {
                token
             }
        });

        return userToken;
    }


    public async generate(user_id: number): Promise<UserToken>{
           const userToken = this.create({
                user_id,
           })


          await this.save(userToken)

          return userToken;
    }


}

export default UserTokensRepository;
