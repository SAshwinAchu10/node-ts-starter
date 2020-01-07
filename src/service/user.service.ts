import BaseService from './base.service';
import User from '../model/user.model';
import * as jwt from 'jwt-simple';
import { EMAIL_NOT_EXIST } from '../constants/message.constants';

let baseService = new BaseService();

export default class UserService {
  /**
   * Get all user
   * @param return
   * @returns return to userController
   **/
  public findAll = async (): Promise<any> => {
    const response = await baseService.findAll(User);
    return response;
  };

  /**
   * user find by param
   * @param KEY
   * @param value
   * @param return
   * @returns return to userController
   **/
  public findByParam = async (key: String, value: String): Promise<any> => {
    let params = { KEY: value };
    params = JSON.parse(JSON.stringify(params).replace('KEY', key.toString()));
    const response = await baseService.findByParam(User, params);
    return response;
  };

  /**
   * create user
   * @param body
   * @param return
   * @returns return to userController
   **/
  public create = async (body: any): Promise<any> => {
    const response = await baseService.create(User, body);
    return response;
  };

  /**
   * Returns user info
   * @param token
   * @returns return to authController
   **/
  public me = async (token: any): Promise<any> => {
    let decoded = jwt.decode(
      token.split(' ')[1],
      String(process.env.JWT_SECRET),
    );
    let params = { _id: decoded._id };
    let user = await baseService.findOne(User, params);
    if (user.data.email == null) {
      return { data: { message: EMAIL_NOT_EXIST }, statusCode: 401 };
    }
    return user;
  };
}
