import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../../../generated/prisma/enums';
import { ReviewController } from './review.controller';

const router = express.Router();
// api/v1/reviews

router.post('/', auth(userRole.CUSTOMER), ReviewController.createReview)

export const ReviewRoutes = router;
