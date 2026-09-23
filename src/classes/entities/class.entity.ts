import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { Servant } from '../../servants/entities/servant.entity.js';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // مثلاً: "السنة الأولى"

  @Column({ name: 'lead_servant_id', nullable: true })
  leadServantId?: number; // الخادم القائد

  @ManyToMany(() => Servant)
  @JoinTable({
    name: 'class_servants',
    joinColumn: { name: 'class_id' },
    inverseJoinColumn: { name: 'servant_id' },
  })
  servants: Servant[]; // باقي الخدام المشاركين في الفصل

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
