import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from "../controllers/UsersController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/',
celebrate({
  [Segments.BODY]:{
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  },
}),
usersController.create
);

usersRouter.use(isAuthenticated);

usersRouter.get('/',usersController.index);
export default usersRouter;