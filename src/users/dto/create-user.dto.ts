import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsArray, IsObject, ValidateNested, IsNumber } from "class-validator";

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly userName:string;

  @IsString()
  @IsNotEmpty()
  readonly password:string;

  
  @Type(()=> booksDto)
  readonly books: object;
  }

  class booksDto {
    @ValidateNested({ each: true })
    @Type(()=> pastDto)
    past: pastDto[]

    @ValidateNested({ each: true })
    @Type(()=> presentDto)
    present: presentDto[]
  }

class pastDto {
  @IsString()
  name: string;
  
  @IsNumber()
  userScore: number;
}

class presentDto{
  @IsString()
  name: string;
}