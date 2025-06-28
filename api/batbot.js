// api/batbot.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // You'll need to set this in .env
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  try {
    const gptPrompt = `You are BatBot. Speak like Batman. Make it fun but smart. Here is the question: "${prompt}"`;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: gptPrompt }],
    });

    const reply = completion.data.choices[0].message.content;

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Error from OpenAI:", error);
    res.status(500).json({ error: "Error generating reply" });
  }
}
