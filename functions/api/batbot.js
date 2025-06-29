const { onRequest } = require("firebase-functions/v2/https");
const cors = require("cors")({ origin: true });
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // You'll set this in `.env`
});

exports.batBot = onRequest(async (req, res) => {
  if (req.method === "OPTIONS") {
    return cors(req, res, () => res.status(204).send(""));
  }

  return cors(req, res, async () => {
    try {
      const prompt = req.body.prompt;
      if (!prompt) return res.status(400).json({ error: "No prompt provided." });

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are BatBot, a funny and dramatic assistant who answers like Batman. Use superhero metaphors. Be helpful, but mysterious.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
        max_tokens: 100,
      });

      const reply = completion.choices[0].message.content.trim();
      res.status(200).json({ reply });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "The Batcomputer overheated. Try again." });
    }
  });
});
