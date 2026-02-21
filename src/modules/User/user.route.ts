import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../../../generated/prisma/enums';

const router = express.Router();

router.get("/profile", auth(userRole.CUSTOMER), UserController.getUserProfile)

export const UserRoutes = router;
