import * as fs from 'fs';
import OpenAI from 'openai';

interface Options {
  prompt?: string;
  audioFile: Express.Multer.File;
}

export const audiotoTextUseCase = async (openai: OpenAI, options: Options) => {
  const { audioFile, prompt } = options;
  //   console.log(audioFile, prompt);

  const response = await openai.audio.transcriptions.create({
    model: 'whisper-1',
    file: fs.createReadStream(audioFile.path),
    prompt: prompt, // el prompt debe estar en el mismo idioma del audio
    language: 'es',
    // response_format: 'vtt' // se usa para subtitulos
    // response_format: 'srt' // se usa para subtitulos
    response_format: 'verbose_json', // este da muchas mas informacion de la transcripcion
  });
  return response;
};
