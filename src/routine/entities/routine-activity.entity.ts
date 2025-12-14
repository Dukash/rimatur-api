import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('routine_activities')
export class RoutineActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  category: string; // 'manutencao' | 'reuniao' | 'documento' | 'outro'

  @Column()
  visibility: string; // 'pessoal' | 'time'

  @Column()
  status: string; // 'pendente' | 'em_andamento' | 'concluida'

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date;

  @Column()
  userId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // 👇 novo campo: nome de quem criou (gestor ou colaborador)
  @Column({ nullable: true })
  createdByName: string;

  @ManyToOne(() => User)
  user: User;
}
