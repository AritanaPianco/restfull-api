import {Request, Response} from 'express'
import CreateSessionService from '../../../services/CreateSessionsService';
import { container } from 'tsyringe';


export default class SessionsController{
         public async create(request: Request, response: Response): Promise<Response>{
             const { email, password } = request.body;

             const createSession = container.resolve(CreateSessionService);
             const user = await createSession.execute({email, password})

             return response.json(user)

         }

}
