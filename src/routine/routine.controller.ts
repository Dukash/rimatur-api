import { Controller, Post, Body, Get, Patch, Delete, Param, Query, BadRequestException } from '@nestjs/common';
import { RoutineService } from './routine.service';

@Controller('routine')
export class RoutineController {
  constructor(private readonly routineService: RoutineService) {}

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

  @Get()
  async findAll(@Query('userId') userId: string, @Query('date') date: string) {
    if (!userId || !date) {
      throw new BadRequestException('userId e date são obrigatórios');
    }
    return await this.routineService.findByUserAndDate(Number(userId), date);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    return await this.routineService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.routineService.delete(id);
  }
}
