import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { Tours } from './Tours.js'

@Entity()
export class ClientTour extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  clientId!: string;

  // @ManyToOne(() => Tours, (tour) => tour.touristsList)
  // tourId!: Tours;

  @Column()
  tourId!: string;

  @Column()
  paymentAmount!: number;

  @Column()
  paymentDate!: string;

  @Column({ type: "int", nullable: true })
  seatNumber!: number | null;
}
