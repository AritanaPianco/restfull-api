import { Router } from "express";
const productsRouter = Router();

import ProductsController from "../controllers/ProductsController";
const ProductController = new ProductsController();

import {celebrate, Joi, Segments} from 'celebrate';


productsRouter.get('/', ProductController.index)

productsRouter.get('/:id',
      celebrate({
         [Segments.PARAMS]: {
             id: Joi.string().required()
         }
      }),
     ProductController.show)

productsRouter.post('/',
      celebrate({
         [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required()
         }
      }),
    ProductController.create)

productsRouter.put('/:id',
      celebrate({
        [Segments.BODY]:{
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required()
        },
        [Segments.PARAMS]: {
            id: Joi.string().required()
        }
      }),
     ProductController.update)

productsRouter.delete('/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required()
        }
     }),
    ProductController.delete)



export default productsRouter;
