import { IsString } from "class-validator";

export class QuestionDto{
    @IsString()
    readonly threadId: string;
k
    @IsString()
    readonly question: string;
}