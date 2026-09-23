import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('servants')
export class Servant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', nullable: true })
  userId?: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ name: 'joined_at', type: 'date', nullable: true })
  joinedAt?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
