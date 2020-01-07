import { Router } from 'express';
import Controller from '../controller/user.controller';

const user: Router = Router();
const controller = new Controller();

user.get('/', controller.findAll);

user.get('/q', controller.findByParam);

user.post('/', controller.create);

user.get('/me', controller.me);

export default user;
