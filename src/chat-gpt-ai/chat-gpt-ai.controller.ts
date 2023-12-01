import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { GetAiModelAnswer } from './model/get-ai-model-answe';

@Controller('chat-gpt-ai')
export class ChatGptAiController {
    constructor(private chatService: ChatGptAiService) { }

    @Post("/message")
    @UsePipes(ValidationPipe)
    getModelAnswer(@Body() data: GetAiModelAnswer) {
        return this.chatService.getModelAnswer(data);
    }

    @Get("/model")
    listModels(){
        return this.chatService.listModels();
    }
}
