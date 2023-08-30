import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Expenses extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  type!: string;

  @Column()
  name!: string;

  @Column()
  color!: string;
}
