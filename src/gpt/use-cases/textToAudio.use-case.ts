import OpenAI from "openai";

interface Options {
    prompt: string;
    voice?: string;
}

export const textToAudioUseCase = async (openai: OpenAI, {prompt , voice}:Options) => {

    const voices = {
        'nova' :'nova',
        'alloy': 'alloy',
    }

    const selectedVoice = voices[voice] ?? 'nova'; 

    return {
        prompt: prompt,
        selectedVoice: selectedVoice
    }
}