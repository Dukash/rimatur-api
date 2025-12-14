import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { RoutineActivity } from './entities/routine-activity.entity';

@Injectable()
export class RoutineService {
  constructor(
    @InjectRepository(RoutineActivity)
    private routineRepository: Repository<RoutineActivity>,
  ) {}

  async create(data: any) {
    try {
      console.log('[CREATE ROUTINE] Recebido:', data);
      
      const routine = this.routineRepository.create(data);
      const saved = await this.routineRepository.save(routine);
      
      console.log('[CREATE ROUTINE] ✅ Criada:', saved);
      return saved;
    } catch (error) {
      console.error('[CREATE ROUTINE] ❌ ERRO:', error.message);
      throw error;
    }
  }

  async findByUserAndDate(userId: number, date: string) {
    try {
      console.log(`[FIND ROUTINE] userId=${userId}, date=${date}`);

      // Criar timestamps para o dia inteiro
      const startOfDay = new Date(`${date}T00:00:00Z`);
      const endOfDay = new Date(`${date}T23:59:59Z`);

      console.log(`[FIND ROUTINE] Buscando entre ${startOfDay} e ${endOfDay}`);

      // ✅ FORMA CORRETA - Usar Between do TypeORM
      const activities = await this.routineRepository.find({
        where: {
          userId: userId,
          startTime: Between(startOfDay, endOfDay),
        },
        order: {
          startTime: 'ASC',
        },
      });

      console.log(`[FIND ROUTINE] ✅ Encontradas ${activities.length}`);
      return activities;
    } catch (error) {
      console.error('[FIND ROUTINE] ❌ ERRO:', error.message);
      throw error;
    }
  }

  async update(id: number, data: any) {
    try {
      console.log(`[UPDATE ROUTINE] id=${id}, data:`, data);

      await this.routineRepository.update(id, data);
      
      const updated = await this.routineRepository.findOne({ 
        where: { id } 
      });

      console.log(`[UPDATE ROUTINE] ✅ Atualizada:`, updated);
      return updated;
    } catch (error) {
      console.error('[UPDATE ROUTINE] ❌ ERRO:', error.message);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      console.log(`[DELETE ROUTINE] id=${id}`);

      const result = await this.routineRepository.delete(id);

      console.log(`[DELETE ROUTINE] ✅ Deletada`);
      return { success: true, affected: result.affected };
    } catch (error) {
      console.error('[DELETE ROUTINE] ❌ ERRO:', error.message);
      throw error;
    }
  }
}