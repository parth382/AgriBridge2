import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { FarmerProfileController } from '../controllers/FarmerProfileController';

const router = express.Router();
const farmerProfileController = new FarmerProfileController();

// Farmer profile routes
router.post('/profile', authMiddleware, farmerProfileController.createFarmerProfile);
router.get('/profile/:id', authMiddleware, farmerProfileController.getFarmerProfile);
router.put('/profile/:id', authMiddleware, farmerProfileController.updateFarmerProfile);
router.delete('/profile/:id', authMiddleware, farmerProfileController.deleteFarmerProfile);
router.get('/organic', farmerProfileController.getOrganicFarmers);
router.get('/experience', farmerProfileController.getFarmersByExperience);

// Farm management routes
router.post('/farms', authMiddleware, async (req, res, next) => {
  try {
    // TODO: Implement create farm
    res.status(201).json({ message: 'Create farm endpoint' });
  } catch (error) {
    next(error);
  }
});

router.get('/farms', authMiddleware, async (req, res, next) => {
  try {
    // TODO: Implement get farmer's farms
    res.status(200).json({ message: 'Get farmer farms endpoint' });
  } catch (error) {
    next(error);
  }
});

router.get('/farms/:farmId', authMiddleware, async (req, res, next) => {
  try {
    // TODO: Implement get specific farm
    res.status(200).json({ message: 'Get specific farm endpoint' });
  } catch (error) {
    next(error);
  }
});

router.put('/farms/:farmId', authMiddleware, async (req, res, next) => {
  try {
    // TODO: Implement update farm
    res.status(200).json({ message: 'Update farm endpoint' });
  } catch (error) {
    next(error);
  }
});

router.delete('/farms/:farmId', authMiddleware, async (req, res, next) => {
  try {
    // TODO: Implement delete farm
    res.status(200).json({ message: 'Delete farm endpoint' });
  } catch (error) {
    next(error);
  }
});

export default router; 