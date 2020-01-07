import { Request, Response } from 'express';
import UserService from '../service/user.service';

const userService = new UserService();

export default class UserController {
  /**
   * Get all user
   * @param req
   * @param res
   * @posts user to userService
   **/
  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      let response = await userService.findAll();
      return res.status(response.statusCode).json(response.data);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

  /**
   * Get user findbyParam
   * @param req
   * @param res
   * @posts user to userService
   **/
  public findByParam = async (req: Request, res: Response): Promise<any> => {
    try {
      let response = await userService.findByParam(
        Object.keys(req.query)[0],
        String(Object.values(req.query)[0]),
      );
      return res.status(response.statusCode).json(response.data);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

  /**
   * create user
   * @param req
   * @param res
   * @posts user to userService
   **/
  public create = async (req: Request, res: Response): Promise<any> => {
    try {
      const response = await userService.create(req.body);
      return res.status(response.statusCode).json(response.data);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

  /**
   * Retrieves user info
   * @param req
   * @param res
   * @posts authToken to userService
   **/
  public me = async (req: Request, res: Response): Promise<any> => {
    let token = req.get('Authorization');
    try {
      let response = await userService.me(String(token));
      return res.status(response.statusCode).json(response.data);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };
}
