import Product from "@modules/users/typeorm/entities/User";
import { UserRepository } from "@modules/users/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password}: IRequest): Promise<Product> {
    const usersRepository = getCustomRepository(UserRepository);
    const userEmailExists = await usersRepository.findByEmail(email);


    if (userEmailExists) throw new AppError('There is already one product with this name');

    const user = usersRepository.create({
      name,
      email,
      password
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;