import User from "@modules/users/typeorm/entities/User";
import { UserRepository } from "@modules/users/typeorm/repositories/UserRepository";
import { getCustomRepository } from "typeorm";


class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);
    
    const user = userRepository.find();

    return user;
  }
}

export default ListUserService;