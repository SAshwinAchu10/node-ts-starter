import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as cors from 'cors';
import * as path from 'path';
import router from './routes';
import { eventContext } from 'aws-serverless-express/middleware';
import * as mongoose from 'mongoose';
import * as Sentry from '@sentry/node';
import CONFIG from './config/config';
import AuthService from './service/auth.service';
import { WHITELISTED_URLS } from './config/security.config';

const auth = new AuthService();

export function initializeApp() {
  const app = express();
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(eventContext());
  app.use(auth.initialize());
  Sentry.init({ dsn: process.env.SENTRY });
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.errorHandler());
  
  app.all('*', (req: any, res: any, next: any) => {
    if (WHITELISTED_URLS.includes(req.path)) return next();
    return auth.authenticate((err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        if (info.name === 'TokenExpiredError') {
          return res.status(401).json({
            message: 'Your token has expired. Please generate a new one',
          });
        } else {
          return res.status(401).json({ message: info.message });
        }
      }
      app.set('user', user);
      return next();
    })(req, res, next);
  });

  app.get('/ping', (req: any, res: any) => {
    res.json({ message: 'pong' });
  });

  app.get('/swagger.json', function(req, res) {
    res.sendFile(path.join(__dirname + '../../api-docs/paycards-swagger.json'));
  });
  app.get('/swagger-ui', function(req, res) {
    res.sendFile(path.join(__dirname + '../../api-docs/swagger.html'));
  });

  mongoose.connect(CONFIG.DB_URL, { useNewUrlParser: true });

  app.use('/api/v1', router);

  return app;
}
