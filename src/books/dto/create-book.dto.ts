import { IsArray, IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    readonly name: string;
    @IsString()
    readonly googleId: string;
    @IsString()
    readonly selfLink: string;
    @IsArray()
    readonly authors:[string]
    @IsString()
    readonly language: string;
    @IsString()
    readonly publishedDate: string;
}