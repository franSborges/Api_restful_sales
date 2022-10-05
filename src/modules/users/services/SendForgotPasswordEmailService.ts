import EtherealMail from "@config/mail/EtherealMail";
import { UserRepository } from "@modules/users/typeorm/repositories/UserRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersTokenRepository from "../typeorm/repositories/UserTokenRepository";

interface IRequest {
  email: string;
}
class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UsersTokenRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) throw new AppError('User does not exists.');

    const token = await userTokenRepository.generate(user.id);

    // console.log(token);
    await EtherealMail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha recebida: ${token?.token}`,
    })
  }
}

export default SendForgotPasswordEmailService;