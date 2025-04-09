import { BaseRepository } from './base/BaseRepository';
import { FarmerProfile } from '../models/FarmerProfile';
import { Between } from 'typeorm';

export class FarmerProfileRepository extends BaseRepository<FarmerProfile> {
  constructor() {
    super(FarmerProfile);
  }

  async findByUserId(userId: number): Promise<FarmerProfile | null> {
    return this.repository.findOne({ where: { user_id: userId } });
  }

  async findOrganicFarmers(): Promise<FarmerProfile[]> {
    return this.repository.find({ where: { organic_certification_status: true } });
  }

  async findByExperienceRange(minYears: number, maxYears: number): Promise<FarmerProfile[]> {
    return this.repository.find({
      where: {
        farming_experience_years: Between(minYears, maxYears)
      }
    });
  }
} 