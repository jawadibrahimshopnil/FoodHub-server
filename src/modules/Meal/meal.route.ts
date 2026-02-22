import express from 'express';
import { MealController } from './meal.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../../../generated/prisma/enums';

const router = express.Router();

router.post("/", auth(userRole.PROVIDER), MealController.createMeal)

export const MealRoutes = router;
