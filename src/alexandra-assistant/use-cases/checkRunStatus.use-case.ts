import OpenAI from "openai";

interface Options {
    threadId: string;
    runId: string;
}

export const checkRunStatuUseCase = async(openai : OpenAI, options : Options)=>{
const {threadId, runId}=options;

const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);

console.log({status: runStatus.status});

if(runStatus.status === 'completed'){
    return runStatus;
}else if(runStatus.status === 'failed'){
    return {status : 'la ejecucion ha fallado. Intentelo nuevamente.'}
}

// esperamos un segundo para volver a revisar el status del run
await new Promise(resolve => setTimeout(resolve, 1000));
await checkRunStatuUseCase(openai, options); // hace una consulta recursiba hasta que este en completed



}