import OpenAI from "openai";

interface Options {
    threadId : string;
    assistantId? : string;
}

export const createRunUseCase = async(openai :OpenAI, options: Options )=>{
    const {threadId,assistantId='asst_5nvIgmGC5QRGRUqdtxlcdWIH'} = options;

    const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id:assistantId,
        // instructions: '', // Importante este parametro sobre escribre el asistente y lo que tenga configurado desde la interface de openai
    })

    console.log({run});
    

    return run;
}