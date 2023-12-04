import { Injectable } from '@nestjs/common';
import { SerpAPI } from 'langchain/tools';
import { Calculator } from 'langchain/tools/calculator';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { configDotenv } from 'dotenv';
configDotenv();
@Injectable()
export class AppService {
  private chatModel;
  constructor() {
    const model = new ChatOpenAI({
      temperature: 0,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    const tools = [
      new SerpAPI(process.env.SERPAPI_API_KEY, {
        hl: 'en',
        gl: 'us',
      }),
      new Calculator(),
    ];

    initializeAgentExecutorWithOptions(tools, model, {
      agentType: 'chat-conversational-react-description',
      verbose: false,
    }).then((executor) => (this.chatModel = executor));
  }
  async getHistory1() {
    const history = [];
    this.chatModel.memory.chatHistory.messages.forEach((item, index) => {
      if (index % 2 == 0) {
        history.push({
          bot: false,
          message: item.content,
        });
      } else {
        history.push({
          bot: true,
          message: item.content,
        });
      }
    });
    return {
      history: history,
    };
  }

  async getHello(message: string) {
    try {
      const result = await this.chatModel.invoke({
        input: message,
      });
      return {
        message: result.output,
      };
    } catch (error) {
      return error;
    }
  }
}
