import * as path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { InternalServerErrorException } from '@nestjs/common';

export const downloadImageAsPng = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new InternalServerErrorException('Downloading image failed.');
  }

  const folderPath = path.resolve('./', './generated/images/');
  fs.mkdirSync(folderPath, { recursive: true }); // con esto verificamos el directorio y si no existe lo crea

  const imageNamePng = `${new Date().getTime()}.png`;
  const buffer = Buffer.from(await response.arrayBuffer());

  // fs.writeFileSync(`${ folderPath }/${ imageName }`, buffer); // esta la configuracion para guardar la imagen con el formato de venga

  const completePath = path.join(folderPath, imageNamePng);
  await sharp(buffer).png().ensureAlpha().toFile(completePath); // con esto guardamos la imagen siempre en forma PNG
  return completePath;
};

export const downloadBase64ImageAsPng = async (base64Image: string) => {
  // Remover encabezado
  base64Image = base64Image.split(';base64,').pop();
  const imageBuffer = Buffer.from(base64Image, 'base64');

  const folderPath = path.resolve('./', './generated/images/');
  fs.mkdirSync(folderPath, { recursive: true });

  const imageNamePng = `${new Date().getTime()}-64.png`;

  // Transformar a RGBA, png // Así lo espera OpenAI
  const completePath = path.join(folderPath, imageNamePng);
  await sharp(imageBuffer)
    .png()
    .ensureAlpha()
    .toFile(completePath);

  return completePath;
};
