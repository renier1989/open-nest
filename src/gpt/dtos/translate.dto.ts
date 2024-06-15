import { IsInt, IsOptional, IsString, isString } from "class-validator";

export class TranslateDto {
    @IsString()
    readonly prompt: string;
    @IsString()
    readonly lang: string;
    @IsInt()
    @IsOptional()
    readonly maxTokens?:number;
}