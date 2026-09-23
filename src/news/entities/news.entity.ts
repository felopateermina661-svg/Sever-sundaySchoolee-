import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'image_url', nullable: true, type: 'text' })
  imageUrl?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
