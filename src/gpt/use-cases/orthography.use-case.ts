interface Options{
  prompt:string;
}

export const orthographyCheckUseCase = async(options:Options) => {
  const {prompt}= options
  return {
    prompt: prompt
  };
};
