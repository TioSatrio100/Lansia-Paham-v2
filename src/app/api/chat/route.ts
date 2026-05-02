import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.SUMOPOD_API_KEY!,
  baseURL: "https://ai.sumopod.com/v1",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { system, messages, max_tokens = 1500 } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Field 'messages' harus berupa array." },
        { status: 400 }
      );
    }

    const openaiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      ...(system ? [{ role: "system" as const, content: system }] : []),
      ...messages,
    ];

    const response = await client.chat.completions.create({
      model: "qwen3-30b-a3b-instruct-2507",
      messages: openaiMessages,
      max_tokens,
      temperature: 0.5,
    });

    const reply = response.choices[0].message.content;

    return NextResponse.json({
      content: [{ type: "text", text: reply }],
    });
  } catch (err: unknown) {
    console.error("[/api/chat] Error:", err);
    const message =
      err instanceof Error ? err.message : "Terjadi kesalahan pada server.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}