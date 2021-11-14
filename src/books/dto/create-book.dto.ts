import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    readonly name: string;
    @IsOptional()
    readonly authors:[string]
    @IsOptional()
    readonly language: string;
    @IsString()
    readonly publishedDate: string;
}