import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import Address from './address.entity';
import Post from '../posts/post.entity';
 
@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column({ unique: true})
  public email: string;

  @Column({ default: false })
  public isEmailConfirmed: boolean;

  @Column({ nullable: true }) // sau bo null
  public phoneNumber: string;
  
  @Column({ default: false })
  public isPhoneNumberConfirmed: boolean;
 
  @Column()
  public name: string;

  @Column({
    nullable: true
  })
  @Exclude()
  public currentHashedRefreshToken?: string;
 
  @Column()
  @Exclude()
  public password: string;
 
  @OneToOne(() => Address, {
    eager: true,
    cascade: true
  })
  @JoinColumn()
  public address: Address;
 
  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[];

  // @Column({ default: false })
  // public isRegisteredWithGoogle: boolean;

  
}
 
export default User;