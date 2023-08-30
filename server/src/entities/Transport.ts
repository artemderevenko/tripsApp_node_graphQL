import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transport extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  type!: string;

  @Column()
  name!: string;

  @Column()
  seats!: number;
}
