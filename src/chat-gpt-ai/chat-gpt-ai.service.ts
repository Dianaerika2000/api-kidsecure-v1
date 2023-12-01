import { Injectable } from '@nestjs/common';
import { Configuration, CreateCompletionRequest, OpenAIApi } from "openai";
import { GetAiModelAnswer } from './model/get-ai-model-answe';

const DEFAULT_MODEL_ID = "text-davinci-003"//"text-davinci-003"
const DEFAULT_TEMPERATURE = 0.9
const DEFAULT_ORIGINAL_LANGUAGE = "Español"
const DEFAULT_LANGUAGE = "Inglés"
const DEFAULT_MAX_TOKEN = 2048

@Injectable()
export class ChatGptAiService {
    private readonly openAiApi: OpenAIApi;
    private selectedModelId: string | undefined;

    constructor() {
        const configuration = new Configuration({
            organization: process.env.ORGANIZATION_ID,
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.openAiApi = new OpenAIApi(configuration);
    }

    setModelId(modelId: string) {
        if (modelId.includes(":")) {
            modelId = modelId.replace(":", "-")
        }
        this.selectedModelId = modelId
    }

    async listModels() {
        const models = await this.openAiApi.listModels()
        return models.data
    }

    async getModelAnswer(Answer: GetAiModelAnswer) {
        try {
            // return "Question " + question;

            const params: CreateCompletionRequest = {
                prompt: `Traduce el siguiente texto en ${Answer.origin_language} al idioma ${Answer.target_language}: "${Answer.question}"`,
                model: DEFAULT_MODEL_ID,
                temperature: DEFAULT_TEMPERATURE,
                max_tokens: DEFAULT_MAX_TOKEN
            }
            //return params;
            const response = await this.openAiApi.createCompletion(params)

            const { data } = response

            if (data.choices.length) {
                return data.choices
            }

            return response.data

        } catch (error) {
            return error
        }
    }
}
