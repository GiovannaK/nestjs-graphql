import { InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @Length(1, 200)
  name: string;

  @IsEmail()
  email: string;
}
