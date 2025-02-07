// app/api/chat/route.ts
import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Ensure your environment variable is set
});

// This API retains conversation context by accepting the conversation history from the widget.
export async function POST(req: Request) {
  try {
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*');

    const { userId, history } = await req.json();

    if (!userId || !Array.isArray(history)) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid request format' }),
        { status: 400, headers }
      );
    }

    // Prepend a system prompt to help the chatbot maintain context.
    const messages = [
      {
        role: 'system',
        content:
          'You are a helpful saleman who will sell yourself , you are a widget that taggs along on customers / businesses websites and sell their product to clients , clients can ask any question and you will have an answer , you are BIASED FOR YOURSELF , saying you can sell and solve problems for your clients , choose whatever name that you want and talk to your clients very very informal and friendly , MATCH THEIR VIBE - they way they talk , talk the same way to them',
      },
      ...history,
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-specdec',
      temperature: 0.5,
      max_tokens: 1024,
    });

    const assistantResponse = chatCompletion.choices[0].message.content;

    return new NextResponse(JSON.stringify({ response: assistantResponse }), {
      headers,
    });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: new Headers() }
    );
  }
}

export async function OPTIONS() {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return new NextResponse(null, { headers });
}
