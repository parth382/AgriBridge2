import { Request, Response, NextFunction } from 'express';
import { FarmerProfileService } from '../services/FarmerProfileService';
import { AppError } from '../utils/AppError';

export class FarmerProfileController {
  private farmerProfileService: FarmerProfileService;

  constructor() {
    this.farmerProfileService = new FarmerProfileService();
  }

  createFarmerProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const farmerProfile = await this.farmerProfileService.createFarmerProfile(req.body);
      res.status(201).json(farmerProfile);
    } catch (error) {
      next(error);
    }
  };

  getFarmerProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const farmerProfile = await this.farmerProfileService.getFarmerProfile(id);
      res.status(200).json(farmerProfile);
    } catch (error) {
      next(error);
    }
  };

  updateFarmerProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const farmerProfile = await this.farmerProfileService.updateFarmerProfile(id, req.body);
      res.status(200).json(farmerProfile);
    } catch (error) {
      next(error);
    }
  };

  deleteFarmerProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await this.farmerProfileService.deleteFarmerProfile(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  getOrganicFarmers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const farmers = await this.farmerProfileService.getOrganicFarmers();
      res.status(200).json(farmers);
    } catch (error) {
      next(error);
    }
  };

  getFarmersByExperience = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { minYears, maxYears } = req.query;
      const farmers = await this.farmerProfileService.getFarmersByExperience(
        parseInt(minYears as string),
        parseInt(maxYears as string)
      );
      res.status(200).json(farmers);
    } catch (error) {
      next(error);
    }
  };
} 