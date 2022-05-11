import { type } from 'os';
import { Chain } from 'src/chains/chain.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  username: string;
  @Column()
  password: string;

  @OneToMany((_type) => Chain, (chain) => chain.user, { eager: true })
  chains: Chain[];
}
