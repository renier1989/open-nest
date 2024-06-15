import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}

export const translateUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt, lang } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
          haz la traduccion del siguiente texto ${prompt} al idioma ${lang}.
          `,
      },
    ],
    model: 'gpt-4o',
    temperature: 0.2,
  });
  // console.log(completion);
  return {message : completion.choices[0].message.content};
};
