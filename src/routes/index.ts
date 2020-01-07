import { Router } from 'express';
import users from './userRoutes';
import listing from './listingRoutes';
import auth from './authRoutes';

const router: Router = Router();
router.use('/user', users);
router.use('/listing', listing);
router.use('/auth', auth);

export default router;
