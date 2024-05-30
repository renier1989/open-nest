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
          'Hola, eres una asistente especializado en temas de programacion',
      },
      {
        role:'user',
        content: prompt
      }
    ],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices[0]);
  return completion.choices[0];
};
