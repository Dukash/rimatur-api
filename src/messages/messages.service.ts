import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, Or } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Marcar mensagem como lida
  async markAsRead(messageId: number) {
    await this.messagesRepository.update(messageId, { isRead: true });
    return this.messagesRepository.findOne({
      where: { id: messageId },
      relations: { sender: true, receiver: true },
    });
  }

  // Marcar múltiplas mensagens como lidas
  async markMessagesAsRead(messageIds: number[]) {
    if (messageIds.length === 0) {
      return { success: false, message: 'Nenhuma mensagem fornecida' };
    }

    await this.messagesRepository
      .createQueryBuilder()
      .update(Message)
      .set({ isRead: true })
      .where('id IN (:...ids)', { ids: messageIds })
      .andWhere('isRead = :isRead', { isRead: false })
      .execute();

    return { success: true, message: `${messageIds.length} mensagem(ns) marcada(s) como lida(s)` };
  }

  // Marcar todas as mensagens de uma conversa como lidas
  async markConversationAsRead(userId: number, otherUserId: number) {
    await this.messagesRepository
      .createQueryBuilder()
      .update(Message)
      .set({ isRead: true })
      .where('receiver_id = :userId', { userId })
      .andWhere('sender_id = :otherUserId', { otherUserId })
      .andWhere('isRead = :isRead', { isRead: false })
      .execute();
    return { success: true };
  }


  async create(createMessageDto: CreateMessageDto) {
    const sender = await this.usersRepository.findOne({
      where: { id: createMessageDto.senderId },
    });

    const receiver = await this.usersRepository.findOne({
      where: { id: createMessageDto.receiverId },
    });

    const message = new Message();
    message.sender = sender!;
    message.receiver = receiver!;
    message.subject = createMessageDto.subject;
    message.body = createMessageDto.body;

    return this.messagesRepository.save(message);
  }

  // Retorna TODAS as mensagens (enviadas E recebidas)
  async findInbox(userId: number) {
    return this.messagesRepository.find({
      where: [
        { sender: { id: userId } as any },      // Mensagens ENVIADAS
        { receiver: { id: userId } as any },    // Mensagens RECEBIDAS
      ],
      relations: { sender: true, receiver: true },
      order: { createdAt: 'DESC' as any },
    });
  }

  // Busca histórico com filtro de palavra
  async searchHistory(userId: number, query: string) {
    return this.messagesRepository.find({
      where: [
        // Mensagens ENVIADAS com busca
        {
          sender: { id: userId } as any,
          subject: ILike(`%${query}%`),
        },
        {
          sender: { id: userId } as any,
          body: ILike(`%${query}%`),
        },
        // Mensagens RECEBIDAS com busca
        {
          receiver: { id: userId } as any,
          subject: ILike(`%${query}%`),
        },
        {
          receiver: { id: userId } as any,
          body: ILike(`%${query}%`),
        },
      ],
      relations: { sender: true, receiver: true },
      order: { createdAt: 'DESC' as any },
    });
  }
}
