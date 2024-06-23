import { IsOptional, IsString } from "class-validator";

export class ImageGenerationDto{
    @IsString()
    readonly prompt: string;

    // sera la propiedad de la imagen original en base64
    @IsString()
    @IsOptional()
    readonly originalImage?: string;

    // sera la propiedad de la mascara de la imagen o porcion de imagen a editar en base64
    @IsString()
    @IsOptional()
    readonly maskImage?: string;


}