import OpenAI from "openai";

interface Options {
    threadId: string;
}

export const getMessagesListUseCase = async(openai: OpenAI , options:Options)=>{

    const {threadId}= options;

    const messagesList = await openai.beta.threads.messages.list(threadId);

    console.log(messagesList.data);
    
    const messages = messagesList.data.map( (message) => ({
        role: message.role,
        content : message.content.map((cont) => (cont as any).text.value),
        createdAt : message.created_at
    }))

    return messages.reverse();


}