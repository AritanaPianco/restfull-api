import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
import { AppDataSource } from '../typeorm'

AppDataSource.initialize().then(() => {
   const server = app.listen(3333, () =>  {
        console.log('Server started on port http://localhost:3333')
    })
});
