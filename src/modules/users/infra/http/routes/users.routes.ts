import { Router } from "express";
import {celebrate, Segments, Joi} from 'celebrate'
import UsersController from "../controllers/UsersController";
import isAuthenticated from "../../../../../shared/infra/http/middlewares/isAuthenticated";
import UserAvatarController from "../controllers/UserAvatarController";
const userRouter = Router()
const usersController = new UsersController();

const usersAvatarController = new UserAvatarController()
import multer from "multer";
import uploadConfig from '@config/upload'

const upload = multer(uploadConfig)

userRouter.get('/', isAuthenticated , usersController.index)

userRouter.get('/:id',
     celebrate({
         [Segments.PARAMS]: {
             id: Joi.string().required()
         }
     }),
    usersController.show)

userRouter.post('/',
      celebrate({
         [Segments.BODY]: {
              name: Joi.string().required(),
              email: Joi.string().email().required(),
              password: Joi.string().required()
         }
      })
     ,usersController.create)

userRouter.put('/:id',
        celebrate({
            [Segments.BODY]: {
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required()
            },
            [Segments.PARAMS]: {
                id: Joi.string().required()
            }
        })
     ,usersController.update)


userRouter.delete('/:id',
       celebrate({
          [Segments.PARAMS]: {
              id: Joi.string().required()
          }
       })

    ,usersController.delete)


userRouter.patch('/avatar', isAuthenticated,
    upload.single('avatar'),
    usersAvatarController.update
)


export default userRouter;
