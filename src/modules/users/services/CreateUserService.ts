import User from "@modules/users/typeorm/entities/User";
import { UserRepository } from "@modules/users/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";

interface IRequest {
  email: string;
  password: string;
}

// interface IResponse {
//   user: User
// }

class CreateSessionsService {
  public async execute({ email, password}: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findByEmail(email);


    if (!user) throw new AppError('Incorrect email/password combination', 401);

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) throw new AppError('Incorrect email/password combination', 401);

    return user;
   
  }
}

export default CreateSessionsService;