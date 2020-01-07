import { Request, Response } from 'express';

import AuthService from '../service/auth.service';

const authService = new AuthService();

export default class AuthController {
  /**
   * Login a user
   * @param req
   * @param res
   * @posts loginData to authService
   **/
  public login = async (req: Request, res: Response): Promise<any> => {
    try {
      let response = await authService.login(req.body);
      return res.status(response.statusCode).json(response.data);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };
}
