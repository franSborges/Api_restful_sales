import { UserRepository } from "@modules/users/typeorm/repositories/UserRepository";
import AppError from "@shared/errors/AppError";
import { addHours, isAfter } from "date-fns";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import UserTokenRepository from "../typeorm/repositories/UserTokenRepository";

interface IRequest {
  token: string;
  password: string;
}                                                                                                                

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if(!userToken) throw new AppError('User Token does not exists.');
    
    const user = await usersRepository.findById(userToken.user_id);

    if(!user) throw new AppError('User does not exists');

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if(isAfter(Date.now(), compareDate)) throw new AppError('Token expired.');

    user.password = await hash(password, 8);
    await usersRepository.save(user);
  }
}

export default ResetPasswordService;