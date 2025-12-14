import { Controller, Get, Post, Body, Query, Patch, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { MarkReadDto } from './dto/mark-read.dto';


@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // ✅ MARCAR CONVERSA COMO LIDA - POST COM BODY
  @Post('conversation/read')
  markConversationAsRead(@Body() body: { userId: number; otherUserId: number }) {
    return this.messagesService.markConversationAsRead(body.userId, body.otherUserId);
  }

  // Marcar mensagem individual como lida
  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.messagesService.markAsRead(Number(id));
  }

  // Endpoints POST para compatibilidade
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

  // Criar nova mensagem
  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  // Histórico com busca
  @Get('history')
  searchHistory(
    @Query('userId') userId: string,
    @Query('query') query: string,
  ) {
    return this.messagesService.searchHistory(Number(userId), query || '');
  }

  // Caixa de entrada do usuário
  @Get()
  findInbox(@Query('userId') userId: string) {
    return this.messagesService.findInbox(Number(userId));
  }
}