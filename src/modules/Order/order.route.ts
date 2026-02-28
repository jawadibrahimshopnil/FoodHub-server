import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../../../generated/prisma/enums';

const router = express.Router();

//api/v1/orders

router.get('/', auth(userRole.PROVIDER), OrderController.viewProviderOrders)
router.get('/all', auth(userRole.ADMIN), OrderController.viewAllOrderAdmin)
router.get('/:orderId', OrderController.getOrderById)
router.patch('/:orderId', auth(userRole.PROVIDER),OrderController.updateOrderStatus)
router.post('/', auth(userRole.CUSTOMER), OrderController.createOrder) 

export const OrderRoutes = router;
