import { UserRepository } from "@modules/users/typeorm/repositories/UserRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserTokenRepository from "../typeorm/repositories/UserTokenRepository";

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) throw new AppError('User does not exists.');
    
    const token = await userTokenRepository.generate(user.id);

    
  }
}

export default SendForgotPasswordEmailService;