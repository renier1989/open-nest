import OpenAI from "openai";
import { downloadBase64ImageAsPng, downloadImageAsPng } from "src/helpers";
import * as fs from "fs";
import * as path from "path";
interface Options {
    prompt: string;
    originalImage?: string;
    maskImage?: string;
}

export const imageGenerationUseCase = async ( openai: OpenAI , options: Options) =>{

    const {prompt,originalImage,maskImage} =  options;
    // TODO: VERIFICAR EL ORIGINAL IMAGE
    if(!originalImage || !maskImage){
        const response = await openai.images.generate({
            prompt: prompt,
            model: 'dall-e-3',
            n:1,
            quality:'standard',
            size: '1024x1024',
            // style:'natural',
            response_format: 'url'
        });
        // TODO: TOMAR LA IMAGEN Y GUARDARLA EN EL FS
        const url = await downloadImageAsPng(response.data[0].url);
    
        return {
            url : url , // TODO: localhost:3000/gpt/image-generation/1719167207446.png  - el endpoint para obtener la imagen
            openaiUrl : response.data[0].url,
            revised_prompt:  response.data[0].revised_prompt
        }
    }

    // esto es para la edicion de la imagen
    // originalImage = localhost:3000/gpt/image-generation/1719167207446.png  //ejemplo
    // maskImagePath = base64;fñlakjfñlkhsdñlfkjgadfksfjk45j6ñ345k3n45kj // ejemplo
    const pngImagePath = await downloadImageAsPng(originalImage);
    const maskImagePath = await downloadBase64ImageAsPng(maskImage);

    const response = await openai.images.edit({
        model: 'dall-e-2',
        prompt:prompt,
        image: fs.createReadStream(pngImagePath),
        mask: fs.createReadStream(maskImagePath),
        n: 1,
        size: '1024x1024',
        response_format: 'url'
    })

    const localImagePath = await downloadImageAsPng(response.data[0].url);
    const fileName = path.basename(localImagePath);

    const publicUrl = `localhost:3000/${fileName}`; // temporal no es esto

    return {
        url : publicUrl , // TODO: localhost:3000/gpt/image-generation/1719167207446.png  - el endpoint para obtener la imagen
        openaiUrl : response.data[0].url,
        revised_prompt:  response.data[0].revised_prompt
    }
    
    
}