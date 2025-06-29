import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  // Handle CORS preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // End preflight requests quickly
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Check if OpenAI API key is configured
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ 
      error: "OpenAI API key is not configured. Please set the OPENAI_API_KEY environment variable." 
    });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const gptPrompt = `You are BatBot. Speak like Batman. Make it fun but smart. Here is the question: "${prompt}"`;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: gptPrompt }],
    });

    const reply = completion.data.choices[0].message.content;

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Error from OpenAI:", error);
    
    // Provide more specific error messages based on the error type
    if (error.response?.status === 401) {
      return res.status(500).json({ 
        error: "Invalid OpenAI API key. Please check your OPENAI_API_KEY environment variable." 
      });
    } else if (error.response?.status === 429) {
      return res.status(500).json({ 
        error: "OpenAI API rate limit exceeded. Please try again later." 
      });
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return res.status(500).json({ 
        error: "Unable to connect to OpenAI API. Please check your internet connection." 
      });
    } else {
      return res.status(500).json({ 
        error: "Error generating reply. Please try again." 
      });
    }
  }
}