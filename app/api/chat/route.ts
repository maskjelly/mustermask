import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Use environment variable for security
});

export async function POST(req: Request) {
  try {
    // Set CORS headers
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    const { message } = await req.json();

    if (!message) {
      return new NextResponse(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers }
      );
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful sales assistant.' },
        { role: 'user', content: message },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
      max_tokens: 1024,
    });

    return new NextResponse(
      JSON.stringify({ response: chatCompletion.choices[0].message.content }),
      { headers }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch response from Groq API' }),
      { status: 500, headers: new Headers() }
    );
  }
}

export async function OPTIONS() {
  // Handle preflight requests
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return new NextResponse(null, { headers });
}