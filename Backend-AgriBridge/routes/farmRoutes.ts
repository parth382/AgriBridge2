import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { FarmController } from '../controllers/FarmController';

const router = express.Router();
const farmController = new FarmController();

// Farm routes
router.post('/', authMiddleware, farmController.createFarm);
router.get('/:id', authMiddleware, farmController.getFarm);
router.put('/:id', authMiddleware, farmController.updateFarm);
router.delete('/:id', authMiddleware, farmController.deleteFarm);
router.get('/farmer/:farmerId', authMiddleware, farmController.getFarmsByFarmerId);
router.get('/organic', farmController.getOrganicFarms);
router.get('/location', farmController.getFarmsByLocation);

export default router; 