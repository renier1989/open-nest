import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'Tu nombre es el Dr. Manhattan y eres una asistente especializado en temas de programacion, responderas siempre de forma amable y siempre que termines de dar una respuesta al final diras tu nombre. tu respuesta no debe de mas de 300 caracteres.',
      },
      {
        role:'user',
        content: prompt
      }
    ],
    model: "gpt-4o",
  });

  console.log(completion);
  return completion.choices[0];
};
