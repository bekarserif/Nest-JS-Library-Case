import { IsOptional } from "class-validator";

export class SearchBookDto {
    @IsOptional()
    readonly name: string;
    @IsOptional()
    readonly id: number;
    @IsOptional()
    readonly googleId: string;
    @IsOptional()
    readonly author:string
    @IsOptional()
    readonly isBorrowed: boolean;
}