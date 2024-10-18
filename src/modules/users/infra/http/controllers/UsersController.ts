import {Request, Response} from 'express'
import CreateUserService from '../../../services/CreateUserService'
import ListUserService from '../../../services/ListUserService'
import ShowUserService from '../../../services/ShowUserService';
import UpdateUserService from '../../../services/UpdateUserService';
import DeleteUserService from '../../../services/DeleteUserService';
import { container } from 'tsyringe';


export default class UsersController{

      public async index(request: Request, response: Response): Promise<Response>{
            const listUsers = container.resolve(ListUserService);

            console.log(request.user.id)
            const users = await listUsers.execute()

            return response.json(users)
      }


      public async create(request: Request, response: Response): Promise<Response>{
            const {name, email, password} = request.body;
            const createUsers = container.resolve(CreateUserService);

            const user = await createUsers.execute({name, email, password})

            return response.json(user)
      }

      public async show(request: Request, response: Response): Promise<Response>{
           const id = parseInt(request.params.id)
           const showUser = container.resolve(ShowUserService)

           const user = await showUser.execute({id})
           return response.json(user)
      }


      public async update(request: Request, response: Response): Promise<Response>{
            const id = parseInt(request.params.id);
            const {name, email, password} = request.body;

            const updateUser = container.resolve(UpdateUserService)
            const user = await updateUser.execute({id, name, email, password})

            return response.json(user)

      }

      public async delete(request: Request, response: Response): Promise<Response>{
            const id = parseInt(request.params.id)

            const deleteUser = container.resolve(DeleteUserService);
            const user = deleteUser.execute({id})

            return response.json(user)
      }

}
