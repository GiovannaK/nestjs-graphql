import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';
import { hashPasswordTransformer } from 'src/helpers/crypto';
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

  @Column({
    transformer: hashPasswordTransformer,
  })
  @HideField()
  password: string;
}
