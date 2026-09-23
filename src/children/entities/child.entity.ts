import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity('children') // اسم الجدول في الداتابيز
export class Child {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ name: 'parent_id', nullable: true })
  parentId?: number;

  @Column({ name: 'class_id', nullable: true })
  classId?: number;

  @Column({ nullable: true, type: 'text' })
  notes?: string;

  @Column({ name: 'photo_url', nullable: true, type: 'text' })
  photoUrl?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
