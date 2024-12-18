import express,{ type NextFunction, type Request, type Response } from 'express';
import "express-async-errors";
import cors from 'cors';
import routes from './routes'
import AppError from '@shared/errors/AppError';
import {pagination} from 'typeorm-pagination';
import '@shared/infra/typeorm';
import '@shared/container';
import {errors} from 'celebrate';
import uploadConfig from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(cors())
app.use(express.json())

app.use(rateLimiter)

app.use(pagination);
app.use('/files', express.static(uploadConfig.directory)) //caminho para os arquivos estáticos serem acessados no frontend
app.use(routes)
app.use(errors())


app.use(( error: Error, request: Request, response: Response, next: NextFunction ) => {

     if(error instanceof AppError){
         return response.status(error.statusCode).json({
             status:'error',
             message: error.message
         })
     }

     return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
     })

})

export {app}