import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from "../controllers/UsersController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import multer from "multer";
import uploadConfig from "@config/upload";
import UserAvatarController from "../controllers/UsersAvatarController";

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarcontroller = new UserAvatarController();

const upload = multer(uploadConfig);

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

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarcontroller.update
);

usersRouter.get('/',usersController.index);
export default usersRouter;