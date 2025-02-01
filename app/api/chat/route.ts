import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Use environment variable for security
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
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

    return NextResponse.json({
      response: chatCompletion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch response from Groq API' },
      { status: 500 }
    );
  }
}