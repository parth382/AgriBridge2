import { BaseRepository } from './base/BaseRepository';
import { Farm } from '../models/Farm';

export class FarmRepository extends BaseRepository<Farm> {
  constructor() {
    super(Farm);
  }

  async findByFarmerId(farmerId: number): Promise<Farm[]> {
    return this.repository.find({ where: { farmer_id: farmerId } });
  }

  async findOrganicFarms(): Promise<Farm[]> {
    return this.repository.find({ where: { organic_certification_status: true } });
  }

  async findFarmsByLocation(lat: number, lng: number, radius: number): Promise<Farm[]> {
    // This is a placeholder for a more complex geospatial query
    return this.repository.find({
      where: {
        location_lat: lat,
        location_lng: lng
      }
    });
  }
} 