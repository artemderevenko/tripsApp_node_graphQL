import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { ClientTour } from './ClientTour.js';

@Entity()
export class Tours extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  startDate!: string;

  @Column()
  endDate!: string;

  @Column()
  location!: string;

  @Column({ type: "int", nullable: true })
  cost!: number | null;

  @Column()
  managerId!: string;

  @Column()
  insurance!: string;

  @Column({ type: "int", nullable: true })
  seats!: number | null;

  @Column()
  transportId!: string;

  @Column()
  color!: string;

  // @OneToMany(() => ClientTour, (clientTour) => clientTour.tourId, {
  //   onDelete: 'CASCADE'
  // })
  // touristsList!: ClientTour[];
}
