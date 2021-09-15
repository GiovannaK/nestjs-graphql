import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  @Length(1, 200)
  name: string;

  @Column()
  @Field()
  @IsEmail()
  email: string;
}
