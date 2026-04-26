import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../../../generated/prisma/enums';
import { paymentController } from './payments.controller';

const router = express.Router();

router.post('/create-checkout-session', auth(userRole.CUSTOMER), paymentController.createCheckoutSession)

export const PaymentRoutes = router;