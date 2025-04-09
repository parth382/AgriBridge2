import { FarmerProfileRepository } from '../repositories/FarmerProfileRepository';
import { FarmerProfile } from '../models/FarmerProfile';
import { AppError } from '../utils/AppError';

export class FarmerProfileService {
  private farmerProfileRepository: FarmerProfileRepository;

  constructor() {
    this.farmerProfileRepository = new FarmerProfileRepository();
  }

  async createFarmerProfile(data: Partial<FarmerProfile>): Promise<FarmerProfile> {
    const existingProfile = await this.farmerProfileRepository.findByUserId(data.user_id!);
    if (existingProfile) {
      throw new AppError('Farmer profile already exists for this user', 400);
    }
    return this.farmerProfileRepository.create(data);
  }

  async getFarmerProfile(id: number): Promise<FarmerProfile> {
    const profile = await this.farmerProfileRepository.findOne(id);
    if (!profile) {
      throw new AppError('Farmer profile not found', 404);
    }
    return profile;
  }

  async updateFarmerProfile(id: number, data: Partial<FarmerProfile>): Promise<FarmerProfile> {
    const profile = await this.farmerProfileRepository.findOne(id);

    if (!profile) {
      throw new Error('FarmerProfile not found');
    }

    const updatedProfile = await this.farmerProfileRepository.update(id, data);
    if (!updatedProfile) {
      throw new AppError('Failed to update farmer profile', 500);
    }
    return updatedProfile;
  }
  

  async deleteFarmerProfile(id: number): Promise<void> {
    const profile = await this.farmerProfileRepository.findOne(id);
    if (!profile) {
      throw new AppError('Farmer profile not found', 404);
    }
    await this.farmerProfileRepository.delete(id);
  }

  async getOrganicFarmers(): Promise<FarmerProfile[]> {
    return this.farmerProfileRepository.findOrganicFarmers();
  }

  async getFarmersByExperience(minYears: number, maxYears: number): Promise<FarmerProfile[]> {
    return this.farmerProfileRepository.findByExperienceRange(minYears, maxYears);
  }
} 