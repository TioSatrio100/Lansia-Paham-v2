import "dotenv/config";  
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" })); 
const client = new OpenAI({
  apiKey: process.env.SUMOPOD_API_KEY!,
  baseURL: "https://ai.sumopod.com/v1",
});

app.post("/api/chat", async (req, res) => {
  try {
    const { system, messages, max_tokens = 1500 } = req.body;

    const openaiMessages = [
      ...(system ? [{ role: "system" as const, content: system }] : []),
      ...messages,
    ];

    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: openaiMessages,
      max_tokens,
      temperature: 0.7,
    });

    const reply = response.choices[0].message.content;
    res.json({ content: [{ type: "text", text: reply }] });
  } catch (err: unknown) {
    console.error("[/api/chat] Error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    res.status(500).json({ error: message });
  }
});

app.listen(3001, () => {
  console.log("API server jalan di http://localhost:3001");
});