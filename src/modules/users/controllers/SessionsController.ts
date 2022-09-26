import { Request, Response } from "express";
import CreateSessionsService from "../services/CreateUserService";

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSession = new CreateSessionsService();

    const user = await createSession.execute({
      email,
      password
    });

    return res.json(user);
  }
}