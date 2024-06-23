import OpenAI from "openai";
import { downloadImageAsPng } from "src/helpers";

interface Options {
    prompt: string;
    originalImage?: string;
    maskImage?: string;
}

export const imageGenerationUseCase = async ( openai: OpenAI , options: Options) =>{

    const {prompt,originalImage,maskImage} =  options;
    // TODO: VERIFICAR EL ORIGINAL IMAGE

    const response = await openai.images.generate({
        prompt: prompt,
        model: 'dall-e-3',
        n:1,
        quality:'standard',
        size: '1024x1024',
        // style:'natural',
        response_format: 'url'
    });
    // TODO: TOMAR LA IMAGEN Y GUARDARLA EN EL FS}

    await downloadImageAsPng(response.data[0].url);

    console.log({response});

    return {
        url : response.data[0].url,
        localPath : '',
        revised_prompt:  response.data[0].revised_prompt
    }
    
    
}