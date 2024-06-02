import OpenAI from 'openai';

class OpenAiInstance {
    private static instance: OpenAiInstance;
    private openai: OpenAI | undefined;

    private constructor() {
        this.openai = new OpenAI({
            organization: process.env.OPENAI_ORGANIZATION,
            project: process.env.OPENAI_PROJECT,
            apiKey: process.env.OPENAI_USER_SK
        });
    }

    public static getInstance() {
        if (!OpenAiInstance.instance) {
            OpenAiInstance.instance = new OpenAiInstance();
        }

        return OpenAiInstance.instance;
    }

    public async makeChatRequest(messages: any, addHistory: Function, question: string) {
        addHistory('user', question);

        messages = [...messages, { role: 'user', content: question }];

        const params: OpenAI.Chat.ChatCompletionCreateParams = {
            messages: messages,
            model: 'gpt-4o'
        };

        const chatCompletion: OpenAI.Chat.ChatCompletion | undefined = await this.openai?.chat.completions.create(params);

        return chatCompletion?.choices[0].message;
    }
}

export default OpenAiInstance;