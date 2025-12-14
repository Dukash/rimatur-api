import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoutineActivity } from './entities/routine-activity.entity';

@Injectable()
export class RoutineService {
  constructor(
    @InjectRepository(RoutineActivity)
    private routineRepository: Repository<RoutineActivity>,
  ) {}

  async create(data: any) {
    const routine = this.routineRepository.create(data);
    return await this.routineRepository.save(routine);
  }

  async findByUserAndDate(userId: number, date: string) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await this.routineRepository.find({
      where: {
        userId: userId,
        startTime: { 
          _type: 'between',
          _value: [startOfDay, endOfDay]
        } as any,
      },
      order: {
        startTime: 'ASC'
      }
    });
  }

  async update(id: number, data: any) {
    await this.routineRepository.update(id, data);
    return await this.routineRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    return await this.routineRepository.delete(id);
  }
}
