import { Router } from "express";
import {celebrate, Segments, Joi} from 'celebrate'
import isAuthenticated from "../../../../../shared/infra/http/middlewares/isAuthenticated";
import ProfileController from "../controllers/ProfileController";
const profileRouter = Router()
const profileController = new ProfileController();


profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show)

profileRouter.put('/',
      celebrate({
         [Segments.BODY]: {
              name: Joi.string().required(),
              email: Joi.string().email().required(),
              old_password: Joi.string(),
              password: Joi.string().optional(),
              password_confirmation: Joi.string()
                                       .valid(Joi.ref('password'))
                                       .when('password', {
                                           is: Joi.string(),
                                           then: Joi.required()
                                       })
         }
      })
     ,profileController.update)




export default profileRouter;
