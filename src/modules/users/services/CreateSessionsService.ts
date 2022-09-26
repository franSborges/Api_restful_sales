import User from "@modules/users/typeorm/entities/User";
import { UserRepository } from "@modules/users/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User,
  token: string
}

class CreateSessionsService {
  public async execute({ email, password}: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findByEmail(email);


    if (!user) throw new AppError('Incorrect email/password combination', 401);

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) throw new AppError('Incorrect email/password combination', 401);
    
    const token = sign({}, 'fa54901fda370db92d9fbcc2c0a62a5da347dfad', {
      subject: user.id,
      expiresIn: '1d'
    });

    return {
      user,
      token
    }
  }
}

export default CreateSessionsService;