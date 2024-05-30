import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';
import { OrthographyDto } from './dtos';


@Injectable()
export class GptService {

    // el service solo se va a encargar de hacer los llamos de los casos de uso
    orthographyCheck(orthographyDto:OrthographyDto){
        return orthographyCheckUseCase({
            prompt: orthographyDto.prompt
        });
    }

}
