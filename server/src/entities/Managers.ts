import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Managers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  middleName!: string;

  @Column()
  birth!: string;

  @Column()
  sex!: string;

  @Column()
  passport!: string;
}
