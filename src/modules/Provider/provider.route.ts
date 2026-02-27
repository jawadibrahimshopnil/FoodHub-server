import express from 'express';
import { ProviderController } from './provider.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../../../generated/prisma/enums';

const router = express.Router();

// api/v1/providers/

router.get('/', ProviderController.getAllProviders)
router.get('/:providerId', ProviderController.getProviderById)
router.post('/', auth(userRole.PROVIDER), ProviderController.createProvider);

export const ProviderRoutes = router;
