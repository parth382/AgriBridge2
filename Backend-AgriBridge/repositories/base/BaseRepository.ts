import { Repository, FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { AppDataSource } from '../../config/data-source';

export interface IBaseRepository<T extends ObjectLiteral> {
    findOne(id: number): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(data: Partial<T>): Promise<T>;
    update(id: number, data: Partial<T>): Promise<T | null>;
    delete(id: number): Promise<boolean>;
    findBy(criteria: FindOptionsWhere<T>): Promise<T[]>;
}

export abstract class BaseRepository<T extends ObjectLiteral> implements IBaseRepository<T> {
    protected repository: Repository<T>;

    constructor(entity: new () => T) {
        this.repository = AppDataSource.getRepository(entity);
    }

    async findOne(id: number): Promise<T | null> {
        return this.repository.findOne({ where: { id } as unknown as FindOptionsWhere<T> });
    }

    async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    async create(data: Partial<T>): Promise<T> {
        const entity = this.repository.create(data as any);
        const savedEntity = await this.repository.save(entity);
        return savedEntity as unknown as T;
    }

    async update(id: number, data: Partial<T>): Promise<T | null> {
        await this.repository.update(id, data as any);
        return this.findOne(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }

    async findBy(criteria: FindOptionsWhere<T>): Promise<T[]> {
        return this.repository.find({ where: criteria });
    }
} 