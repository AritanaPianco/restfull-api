import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Generated} from 'typeorm'
import {v4 as uuidv4} from 'uuid'
import { IUserToken } from '@modules/users/domain/models/IUserToken'

@Entity('users_tokens')
class UserToken implements IUserToken{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    token: string

    @Column()
    user_id: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date


    constructor(){
         if(!this.token){
            this.token = uuidv4();
         }
    }

}

export default UserToken;