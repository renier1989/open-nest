import * as path from "path";
import * as fs from 'fs';
import { InternalServerErrorException } from "@nestjs/common";

export const downloadImageAsPng = async(url:string) =>{

    const response = await fetch(url);
    if(!response.ok){
        throw new InternalServerErrorException('Downloading image failed.');
    }

    const folderPath = path.resolve('./','./generated/images/');
    fs.mkdirSync(folderPath, { recursive: true}); // con esto verificamos el directorio y si no existe lo crea

    const imageName = `${ new Date().getTime()}.png`;
    const buffer = Buffer.from( await response.arrayBuffer());

    fs.writeFileSync(`${ folderPath }/${ imageName }`, buffer);

}