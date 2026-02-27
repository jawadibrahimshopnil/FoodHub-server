import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../../../generated/prisma/enums';

const router = express.Router();

// api/v1/users/profile

router.get("/profile", auth(userRole.CUSTOMER), UserController.getUserProfile)
router.patch("/profile", auth(userRole.CUSTOMER, userRole.PROVIDER), UserController.updateUser)

export const UserRoutes = router;
