import express from 'express';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../../../generated/prisma/enums';

const router = express.Router();

router.post('/', auth(userRole.ADMIN), CategoryController.createCategory)
router.patch('/:categoryId', auth(userRole.ADMIN), CategoryController.updateCategory)
router.delete('/:categoryId', auth(userRole.ADMIN), CategoryController.deleteCategory)

export const CategoryRoutes = router;
