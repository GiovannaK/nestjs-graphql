import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class AuthInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(8, 200)
  password: string;
}
