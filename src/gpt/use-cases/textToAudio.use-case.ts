import * as fs from 'fs';
import * as path from 'path';

import OpenAI from 'openai';

interface Options {
  prompt: string;
  voice?: string;
}

export const textToAudioUseCase = async (
  openai: OpenAI,
  { prompt, voice }: Options,
) => {
  const voices = {
    nova: 'nova',
    alloy: 'alloy',
    echo: 'echo',
    fable: 'fable',
    onyx: 'onyx',
    shimmer: 'shimmer',
  };
  const selectedVoice = voices[voice] ?? 'nova';
  const folderPath = path.resolve(__dirname, '../../../generated/audios/'); // definicion del path para almacenar
  const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`); // definicion del nombre del archivo NOTA: se puede generar el mismo nombre de archivo si 2 o mas usuairos suben al mismo
  fs.mkdirSync(folderPath, { recursive: true }); // definicion de la creacion de los directorios

  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: selectedVoice,
    input: prompt
  });

  const buffer = Buffer.from( await mp3.arrayBuffer() );
  fs.writeFileSync(speechFile, buffer);

  return {
    prompt: prompt,
    selectedVoice: selectedVoice,
    filePath : speechFile,
  };
};
