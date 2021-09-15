import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  /*   @Field()
  @IsString()
  @IsOptional()
  @IsUUID()
  id?: string; */

  @IsOptional()
  @Field({ nullable: true })
  @IsString()
  @Length(1, 200)
  name?: string;

  @IsOptional()
  @Field({ nullable: true })
  @IsEmail()
  email?: string;
}
