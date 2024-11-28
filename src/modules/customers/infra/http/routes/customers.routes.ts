import { Router } from "express";
const customersRouter = Router();
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import CustomersController from "../controllers/CustomersController";
const customersController = new CustomersController();

import {celebrate, Joi, Segments} from 'celebrate';


// customersRouter.use(isAuthenticated);

customersRouter.get('/',customersController.index)

customersRouter.get('/:id',
      celebrate({
         [Segments.PARAMS]: {
             id: Joi.string().required()
         }
      }),
       customersController.show);

customersRouter.post('/',
      celebrate({
         [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required()
         }
      }),
    customersController.create)

customersRouter.put('/:id',
      celebrate({
        [Segments.BODY]:{
            name: Joi.string().required(),
            email: Joi.string().email().required()
        },
        [Segments.PARAMS]: {
            id: Joi.string().required()
        }
      }),
     customersController.update)

customersRouter.delete('/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required()
        }
     }),
    customersController.delete)



export default customersRouter;
