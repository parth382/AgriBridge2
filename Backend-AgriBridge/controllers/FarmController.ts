import { Request, Response, NextFunction } from 'express';
import { FarmService } from '../services/FarmService';
import { AppError } from '../utils/AppError';

export class FarmController {
  private farmService: FarmService;

  constructor() {
    this.farmService = new FarmService();
  }

  createFarm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const farm = await this.farmService.createFarm(req.body);
      res.status(201).json(farm);
    } catch (error) {
      next(error);
    }
  };

  getFarm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const farm = await this.farmService.getFarm(id);
      res.status(200).json(farm);
    } catch (error) {
      next(error);
    }
  };

  updateFarm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const farm = await this.farmService.updateFarm(id, req.body);
      res.status(200).json(farm);
    } catch (error) {
      next(error);
    }
  };

  deleteFarm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await this.farmService.deleteFarm(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  getFarmsByFarmerId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const farmerId = parseInt(req.params.farmerId);
      const farms = await this.farmService.getFarmsByFarmerId(farmerId);
      res.status(200).json(farms);
    } catch (error) {
      next(error);
    }
  };

  getOrganicFarms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const farms = await this.farmService.getOrganicFarms();
      res.status(200).json(farms);
    } catch (error) {
      next(error);
    }
  };

  getFarmsByLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lat, lng, radius } = req.query;
      const farms = await this.farmService.getFarmsByLocation(
        parseFloat(lat as string),
        parseFloat(lng as string),
        parseFloat(radius as string)
      );
      res.status(200).json(farms);
    } catch (error) {
      next(error);
    }
  };
} 