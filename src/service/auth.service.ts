import { Request } from 'express';
import * as jwt from 'jwt-simple';
import * as passport from 'passport';
import * as moment from 'moment';
import { Strategy, ExtractJwt } from 'passport-jwt';
import BaseService from './base.service';
import User from '../model/user.model';
import {
  EMAIL_NOT_EXIST,
  INVALID_CREDS,
  USER_NOT_FOUND,
} from '../constants/message.constants';

let baseService = new BaseService();

export default class AuthService {
  /**
   * Initialize passport lib
   **/
  public initialize = () => {
    passport.use('jwt', this.getStrategy());
    return passport.initialize();
  };

  /**
   * Login using email and password
   * @param loginData
   * @returns return to authController
   **/
  public login = async (body: any): Promise<any> => {
    let params = { email: body.email };
    let response = await baseService.findOne(User, params);
    if (response.data.email == null) {
      return { data: { message: EMAIL_NOT_EXIST }, statusCode: 401 };
    }
    let success = await response.data.comparePassword(body.password);
    if (success === false) {
      return { data: { message: INVALID_CREDS }, statusCode: 401 };
    }
    return this.genToken(response.data);
  };

  /**
   * Authenticate request
   * @callbacks
   **/
  public authenticate = (callback: any) =>
    passport.authenticate(
      'jwt',
      { session: false, failWithError: true },
      callback,
    );

  /**
   * Authenticate request
   * @param user
   * @returns token info
   **/
  private genToken = (user: any): Object => {
    let expires = moment()
      .utc()
      .add({ days: Number(process.env.JWT_EXPIRATION_DAYS) })
      .unix();
    let token = jwt.encode(
      {
        exp: expires,
        _id: user._id,
      },
      String(process.env.JWT_SECRET),
    );

    return {
      data: {
        token: 'Bearer ' + token,
        expires: moment.unix(expires).format(),
        user: user._id,
      },
      statusCode: 200,
    };
  };

  /**
   * Authenticate request
   * @returns user
   **/
  private getStrategy = (): Strategy => {
    const params = {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      passReqToCallback: true,
    };

    return new Strategy(params, (req: Request, payload: any, done: any) => {
      User.findOne({ _id: payload._id }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user === null) {
          return done(null, false, {
            message: USER_NOT_FOUND,
          });
        }
        return done(null, { _id: user._id, email: user.email });
      });
    });
  };
}
