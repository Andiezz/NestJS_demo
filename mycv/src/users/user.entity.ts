import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() //? tell TypeORM to create a new TABLE to model this class / collection
export class User {
  @PrimaryGeneratedColumn() //? add new column call id and serve as an id for every user (automatically set)
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
  //? all done at startup by synchronize true (ì we add a new field)
}
