import { Router } from "express";
import {celebrate, Joi, Segments} from 'celebrate';
import OrdersController from "../controllers/OrdersController";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";

const ordersRouter = Router();
const OrderController = new OrdersController();

ordersRouter.use(isAuthenticated);

ordersRouter.get('/:id',
      celebrate({
         [Segments.PARAMS]: {
             id: Joi.string().required()
         }
      }),
    OrderController.show)

ordersRouter.post('/',
      celebrate({
         [Segments.BODY]: {
            customer_id: Joi.string().required(),
            products: Joi.required(),
         }
      }),
    OrderController.create)

export default ordersRouter;
