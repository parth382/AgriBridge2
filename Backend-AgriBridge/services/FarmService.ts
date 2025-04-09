import { FarmRepository } from '../repositories/FarmRepository';
import { Farm } from '../models/Farm';
import { AppError } from '../utils/AppError';

export class FarmService {
  private farmRepository: FarmRepository;

  constructor() {
    this.farmRepository = new FarmRepository();
  }

  async createFarm(data: Partial<Farm>): Promise<Farm> {
    return this.farmRepository.create(data);
  }

  async getFarm(id: number): Promise<Farm> {
    const farm = await this.farmRepository.findOne(id);
    if (!farm) {
      throw new AppError('Farm not found', 404);
    }
    return farm;
  }

  async updateFarm(id: number, data: Partial<Farm>): Promise<Farm> {
    const farm = await this.farmRepository.findOne(id);
    if (!farm) {
      throw new AppError('Farm not found', 404);
    }
    return farm;
  }

  async deleteFarm(id: number): Promise<void> {
    const farm = await this.farmRepository.findOne(id);
    if (!farm) {
      throw new AppError('Farm not found', 404);
    }
    await this.farmRepository.delete(id);
  }

  async getFarmsByFarmerId(farmerId: number): Promise<Farm[]> {
    return this.farmRepository.findByFarmerId(farmerId);
  }

  async getOrganicFarms(): Promise<Farm[]> {
    return this.farmRepository.findOrganicFarms();
  }

  async getFarmsByLocation(lat: number, lng: number, radius: number): Promise<Farm[]> {
    return this.farmRepository.findFarmsByLocation(lat, lng, radius);
  }
} 