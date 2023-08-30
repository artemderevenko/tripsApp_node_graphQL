import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExpensesTour extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  expensesId!: string;

  @Column()
  tourId!: string;

  @Column()
  amount!: number;

  @Column()
  description!: string;
}
