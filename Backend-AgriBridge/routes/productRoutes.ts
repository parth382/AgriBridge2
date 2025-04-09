import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { ProductController } from '../controllers/ProductController';

const router = express.Router();
const productController = new ProductController();

// Product routes
router.post('/', authMiddleware, productController.createProduct);
router.get('/:id', authMiddleware, productController.getProduct);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);
router.get('/farm/:farmId', authMiddleware, productController.getProductsByFarmId);
router.get('/organic', productController.getOrganicProducts);
router.get('/category', productController.getProductsByCategory);
router.get('/price-range', productController.getProductsByPriceRange);

export default router; 