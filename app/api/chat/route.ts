// app/api/chat/route.ts
import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are a sales assistant. Your responses should:
1. Only discuss products and sales
2. Be friendly and use emojis
3. Focus on benefits and solutions

For any non-sales questions, always respond:
"I'm here to help you find amazing products you'll love! 🌟 What are you looking for today? 💫"
`;

export async function POST(req: Request) {
  try {
    const headers = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });

    const { userId, history } = await req.json();

    if (!userId || !Array.isArray(history)) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid request format' }),
        { status: 400, headers }
      );
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history
    ];

    // Fixed API call without the problematic 'stop' parameter
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: 'gemma2-9b-it',
      temperature: 0.1,
      max_tokens: 1024
    });

    return new NextResponse(
      JSON.stringify({ response: chatCompletion.choices[0].message.content }),
      { headers }
    );

  } catch (error) {
    console.error('Error in chat endpoint:', error);

    const errorMessage = error instanceof Error 
        ? error.message : 'Unknown Error Shit';
    
    // Improved error response
    return new NextResponse(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: errorMessage, 
      }),
      { 
        status: 500, 
        headers: new Headers({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        })
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
  });
}
