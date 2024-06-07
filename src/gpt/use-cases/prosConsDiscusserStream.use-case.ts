import OpenAI from 'openai';
interface Options {
  prompt: string;
}

export const prosConsDiscusserStreamUseCase = async (
  openai: OpenAI,
  {prompt}: Options,
  ) => {
    // con los streams en true de openai se debe retornar toda la respuesta
  return await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
            El usuario te dara una pregunta de la cual tendras que hacer una comparacion indicando cuales son los PROS Y CONTRAS.
            Si la pregunta del usuario no se corresponde o no es valida para hacer una comparacion, tu le diras amablemente que no puedes hacer una comparacion de lo que esta pregunta.
            La respuesat debe ser en forma de markdown.
            Los PROS y CONTRAS deben estar en una lista.
            `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-4o',
    temperature: 0.8,
    max_tokens: 400,
    stream: true,
  });
};
