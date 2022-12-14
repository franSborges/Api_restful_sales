import User from "@modules/users/typeorm/entities/User";
import { UserRepository } from "@modules/users/typeorm/repositories/UserRepository";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password}: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const userEmailExists = await usersRepository.findByEmail(email);


    if (userEmailExists) throw new AppError('There is already one product with this name');

    const hashedPassword = await hash(password, 8);
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;