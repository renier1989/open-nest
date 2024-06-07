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
        content: `
          Eres un asistente de corrección de textos en español. 
          Tu tarea es revisar y corregir los errores ortográficos y gramaticales en el siguiente texto. 
          Asegúrate de corregir errores de ortografía, puntuación, tildes y gramática, pero mantén el estilo y la intención original del autor. 
          No hagas cambios en el contenido o el significado del texto.
          Debes reponder en formato JSON.
          Debes mostrar las correccion que haz hecho con la información de la solucion.
          Tambien debes dar un porcentaje de acierto del texto que ingreso el usuario.

          Si no hay errores en el texto ingresaro, debes retornar un mensaje de felicitaciones.

          Ejemplo de Salida : 
          {
            userScore: number,
            errors: string[], // ['error -> solución']
            message:  string // Usa emojis y texto para mostrar el mensaje de felicitaciones 
          }
          
          `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-4o',
    temperature: 0.4,
    max_tokens: 150,
    response_format: { 
      type: 'json_object' 
    },
  });

  // console.log(completion);
  // return completion.choices[0];
  const jsonResp = JSON.parse(completion.choices[0].message.content);
  return jsonResp;
};
