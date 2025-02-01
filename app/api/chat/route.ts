import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Use environment variable for security
});

// In-memory storage for conversation history (replace with a database in production)
const conversationHistory: Record<string, Array<{ role: 'user' | 'assistant', content: string }>> = {};

export async function POST(req: Request) {
  try {
    // Set CORS headers to allow all origins
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins
    headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    // Parse the request body
    const { message, userId } = await req.json();

    // Validate the request body
    if (!message || typeof message !== 'string' || !userId || typeof userId !== 'string') {
      return new NextResponse(
        JSON.stringify({ error: 'Message and userId are required and must be valid strings' }),
        { status: 400, headers }
      );
    }

    // Retrieve or initialize conversation history for the user
    if (!conversationHistory[userId]) {
      conversationHistory[userId] = [];
    }

    // Add the user's message to the conversation history
    conversationHistory[userId].push({ role: 'user', content: message });

    // Create the chat completion with the entire conversation history
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Your PERSONAL NAME IS MUSTARD, you are a ChatBot that\'s under experiment. You are integrated into customers\' websites and for now, you have everything in your store—whatever you ask for, from humans to metals to objects to stars to cosmos, everything. You also will be making up prices according to what you think is relevant—you will be the WORLD\'S BEST SALESMAN.',
        },
        ...conversationHistory[userId], // Include the conversation history
      ],
      model: 'deepseek-r1-distill-llama-70b',
      temperature: 0.5,
      max_tokens: 1024,
    });

    // Validate the assistant's response
    const assistantResponse = chatCompletion.choices[0].message.content;
    if (!assistantResponse || typeof assistantResponse !== 'string') {
      throw new Error('Invalid response from Groq API');
    }

    // Add the assistant's response to the conversation history
    conversationHistory[userId].push({ role: 'assistant', content: assistantResponse });

    // Return the assistant's response
    return new NextResponse(
      JSON.stringify({ response: assistantResponse }),
      { headers }
    );
  } catch (error) {
    console.error('Error in POST handler:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch response from Groq API' }),
      { status: 500, headers: new Headers() }
    );
  }
}

export async function OPTIONS() {
  // Handle preflight requests
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return new NextResponse(null, { headers });
}