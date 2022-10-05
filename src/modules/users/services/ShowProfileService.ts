import User from "@modules/users/typeorm/entities/User";
import { UserRepository } from "@modules/users/typeorm/repositories/UserRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    
    const user = await userRepository.findById(user_id);

    if (!user) throw new AppError("User not found.")

    return user;
  }
}

export default ShowProfileService;