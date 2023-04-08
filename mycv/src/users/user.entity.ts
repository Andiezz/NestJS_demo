import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { Report } from '../reports/report.entity';

@Entity() //? tell TypeORM to create a new TABLE to model this class / collection
export class User {
  @PrimaryGeneratedColumn() //? add new column call id and serve as an id for every user (automatically set)
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
  //? all done at startup by synchronize true (if we add a new field)

  @Column({ default: true })
  admin: boolean;

  //? do not cause the change
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  //? HOOK only work when pass in the user entity
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
