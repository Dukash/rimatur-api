import { Controller, Post, Body, Get, Patch, Delete, Param, Query, BadRequestException } from '@nestjs/common';
import { RoutineService } from './routine.service';

@Controller('routine')
export class RoutineController {
  constructor(private readonly routineService: RoutineService) {}

  // ✅ CRIAR NOVA ATIVIDADE
  @Post()
  async create(@Body() body: any) {
    const { title, description, category, visibility, startTime, userId, status, createdByRole } = body;

    if (visibility === 'time' && createdByRole !== 'gestor') {
      throw new BadRequestException('Apenas gestores podem criar atividades para o time');
    }

    return await this.routineService.create({
      title,
      description,
      category,
      visibility,
      startTime: new Date(startTime),
      userId,
      status: status || 'pendente',
    });
  }

  // ✅ BUSCAR ATIVIDADES POR DATA E USUÁRIO
  @Get()
  async findAll(@Query('userId') userId: string, @Query('date') date: string) {
    console.log(`[CONTROLLER GET] userId=${userId}, date=${date}`);

    if (!userId || !date) {
      console.error('[CONTROLLER GET] ❌ userId ou date ausentes');
      throw new BadRequestException('userId e date são obrigatórios');
    }

    try {
      const activities = await this.routineService.findByUserAndDate(Number(userId), date);
      console.log(`[CONTROLLER GET] ✅ Retornando ${activities.length} atividades`);
      
      // ✅ SEMPRE retorna array
      return Array.isArray(activities) ? activities : [];
    } catch (error) {
      console.error(`[CONTROLLER GET] ❌ ERRO:`, error.message);
      throw error;
    }
  }

  // ✅ ATUALIZAR ATIVIDADE
  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    console.log(`[CONTROLLER PATCH] id=${id}, body:`, body);

    try {
      const result = await this.routineService.update(id, body);
      console.log(`[CONTROLLER PATCH] ✅ Atualizada`);
      return result;
    } catch (error) {
      console.error(`[CONTROLLER PATCH] ❌ ERRO:`, error.message);
      throw error;
    }
  }

  // ✅ DELETAR ATIVIDADE
  @Delete(':id')
  async delete(@Param('id') id: number) {
    console.log(`[CONTROLLER DELETE] id=${id}`);

    try {
      const result = await this.routineService.delete(id);
      console.log(`[CONTROLLER DELETE] ✅ Deletada`);
      return result;
    } catch (error) {
      console.error(`[CONTROLLER DELETE] ❌ ERRO:`, error.message);
      throw error;
    }
  }
}