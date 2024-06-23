import OpenAI from 'openai';
import { downloadBase64ImageAsPng, downloadImageAsPng } from 'src/helpers';
import * as fs from 'fs';
import * as path from 'path';
interface Options {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}

export const imageGenerationUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt, originalImage, maskImage } = options;
  // TODO: VERIFICAR EL ORIGINAL IMAGE
  if (!originalImage || !maskImage) {
    const response = await openai.images.generate({
      prompt: prompt,
      model: 'dall-e-3',
      n: 1,
      quality: 'standard',
      size: '1024x1024',
      style:'vivid',
      response_format: 'url',
    });
    // TODO: TOMAR LA IMAGEN Y GUARDARLA EN EL FS
    const fileName = await downloadImageAsPng(response.data[0].url); 
    const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;

    return {
      url: url,
      openaiUrl: response.data[0].url,
      revised_prompt: response.data[0].revised_prompt,
    };
  }

  // esto es para la edicion de la imagen
  // originalImage = localhost:3000/gpt/image-generation/1719167207446.png  //ejemplo
  // maskImagePath = base64;fñlakjfñlkhsdñlfkjgadfksfjk45j6ñ345k3n45kj // ejemplo
  const pngImagePath = await downloadImageAsPng(originalImage , true);
  const maskImagePath = await downloadBase64ImageAsPng(maskImage, true);

  const response = await openai.images.edit({
    model: 'dall-e-2',
    prompt: prompt,
    image: fs.createReadStream(pngImagePath),
    mask: fs.createReadStream(maskImagePath),
    n: 1,
    size: '1024x1024',
    response_format: 'url',
  });

  const fileName = await downloadImageAsPng(response.data[0].url); 
  const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;

  return {
    url: url,
    openaiUrl: response.data[0].url,
    revised_prompt: response.data[0].revised_prompt,
  };
};
