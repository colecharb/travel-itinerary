// import { OpenAI } from 'openai';
import { CohereClient } from 'cohere-ai';
import onlyJson from '../../prompts/onlyJson';
import { Message } from '@/store/chatAtoms';
import { Message as CohereMessage } from 'cohere-ai/api';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

type ChatResponse = Pick<Message, 'id' | 'text' | 'destinations' | 'itinerary'>;

// async function getOpenAIResponse(
//   prompt: string,
//   prevResponseId?: string,
// ): Promise<ChatResponse> {
//   const completion = await openai.responses.create({
//     model: 'gpt-5-nano', // or 'gpt-4', 'gpt-3.5-turbo'
//     // temperature: 0.7,
//     input: [{ role: 'user', content: prompt }],
//     previous_response_id: prevResponseId,
//   });

//   const text = completion.output_text.trim();

//   // Try to parse JSON from the response
//   let parsed;
//   try {
//     parsed = JSON.parse(text);
//   } catch {
//     // fallback: simple parsing or empty default
//     parsed = { destinations: [], itinerary: text };
//   }

//   return {
//     id: completion.id,
//     text,
//     destinations: parsed.destinations || [],
//     itinerary: parsed.itinerary || '',
//   };
// }

async function getCohereResponse(
  prompt: string,
  // chatId?: string,
  chatHistory?: CohereMessage[],
): Promise<ChatResponse> {
  // console.log(chatId);

  const response = await cohere.chat({
    model: 'command-r7b-12-2024',
    message: prompt,
    // conversationId: chatId,
    chatHistory,
    // Note: Cohere doesn't have a direct equivalent to previous_response_id
    // You might need to handle conversation history differently
  });

  const text = response.text.trim();

  // Try to parse JSON from the response
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    // fallback: simple parsing or empty default
    parsed = { destinations: [], itinerary: text };
  }

  return {
    id: response.responseId, // Generate a unique ID for Cohere responses
    text,
    destinations: parsed.destinations || [],
    itinerary: parsed.itinerary || '',
  };
}

export async function POST(request: Request) {
  try {
    const { message, chatHistory } = (await request.json()) as {
      message: string | undefined;
      prevResponseId: string | undefined;
      chatId: string | undefined;
      chatHistory: Message[] | undefined;
    };

    // console.log(prevResponseId);

    if (!message || typeof message !== 'string') {
      return Response.json({ error: 'Invalid message' }, { status: 400 });
    }

    // Prompt engineering: instruct the AI to respond with JSON containing two parts
    const prompt = onlyJson(message);

    const cohereHistory = chatHistory?.map<CohereMessage>((chatMessage) => ({
      message: chatMessage.text,
      role: chatMessage.sender === 'user' ? 'USER' : 'CHATBOT',
    }));
    const response = await getCohereResponse(prompt, cohereHistory);
    // const response = await getOpenAIResponse(prompt, prevResponseId);

    return Response.json(response);
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'API request failed' }, { status: 500 });
  }
}
