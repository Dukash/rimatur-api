import { Controller, Get, Post, Body, Query, Patch, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { MarkReadDto } from './dto/mark-read.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.messagesService.markAsRead(Number(id));
  }

  // Endpoints POST para compatibilidade com o frontend
  @Post('mark-read')
  markRead(@Body() markReadDto: MarkReadDto) {
    return this.messagesService.markMessagesAsRead(markReadDto.messageIds);
  }

  @Post('read')
  read(@Body() markReadDto: MarkReadDto) {
    return this.messagesService.markMessagesAsRead(markReadDto.messageIds);
  }

  @Post('markAsRead')
  markAsReadPost(@Body() markReadDto: MarkReadDto) {
    return this.messagesService.markMessagesAsRead(markReadDto.messageIds);
  }

  // Marcar todas as mensagens de uma conversa como lidas
  @Patch('conversation/read')
  markConversationAsRead(
    @Query('userId') userId: string,
    @Query('otherUserId') otherUserId: string,
  ) {
    return this.messagesService.markConversationAsRead(
      Number(userId),
      Number(otherUserId),
    );
  }

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  // Caixa de entrada do usuário
  @Get()
  findInbox(@Query('userId') userId: string) {
    return this.messagesService.findInbox(Number(userId));
  }

  // Histórico com busca
  @Get('history')
  searchHistory(
    @Query('userId') userId: string,
    @Query('query') query: string,
  ) {
    return this.messagesService.searchHistory(Number(userId), query || '');
  }
}
