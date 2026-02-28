import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../../../generated/prisma/enums';

const router = express.Router();

// api/v1/users/profile

router.get("/profile", auth(userRole.CUSTOMER), UserController.getUserProfile)
router.get("/all", auth(userRole.ADMIN), UserController.viewAllUsersAdmin)
router.patch("/profile", auth(userRole.CUSTOMER, userRole.PROVIDER), UserController.updateUser)
router.patch("/:userId", auth(userRole.ADMIN), UserController.updateUserStatus)

export const UserRoutes = router;
