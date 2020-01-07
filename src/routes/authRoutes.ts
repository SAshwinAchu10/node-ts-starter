import { Router } from 'express';
import Controller from '../controller/auth.controller';

const auth: Router = Router();
const controller = new Controller();

auth.post('/login', controller.login);

export default auth;
