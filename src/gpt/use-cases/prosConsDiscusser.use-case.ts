import OpenAI from 'openai';
interface Options {
  prompt: string;
}

export const prosConsDiscusserUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
            El usuario te dara una pregunta de la cual tendras que hacer una comparacion indicando cuales son los PROS Y CONTRAS.
            Si la pregunta del usuario no se corresponde o no es valida para hacer una comparacion, tu le diras amablemente que no puedes hacer una comparacion de lo que esta pregunta.
            La respuesta debe ser en forma de markdown.
            La respuesta no puede quedar incompleta, por lo que debes ajustar a la respuesta a un maximo de 400 palabras
            Los PROS y CONTRAS deben estar en una lista.
            Las palabras Claves que se esten comparando colocalas en una etiqueta de H1 y en Strong.
            los Pors y Contras colocalas en una etiqueta strong y crealos como lista ordenadas.
            Solo salta directamente a la comparacion y No des una introduccion.
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
    // response_format: {
    //    type: 'json_object',
    // },
  });

  console.log(completion);
  return completion.choices[0].message;
};
