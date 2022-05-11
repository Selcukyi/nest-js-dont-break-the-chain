import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { chainStatus } from './chain-status.enum';

@Entity()
export class Chain {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: chainStatus;
  @Column()
  period: number;
  @ManyToOne((_type) => User, (user) => user.chains, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
