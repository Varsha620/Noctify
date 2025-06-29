const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const OpenAI = require("openai");
const cors = require("cors")({ origin: true, methods: ["POST", "OPTIONS"] });

const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY");

exports.batBot = onRequest({ secrets: [OPENAI_API_KEY] }, async (req, res) => {
  if (req.method === "OPTIONS") {
    return cors(req, res, () => res.status(204).send(""));
  }

  return cors(req, res, async () => {
  try {
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY.value(),
    });

    const prompt = req.body.prompt;
    console.log("🔍 Incoming Prompt:", prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: `Pretend you're Batman. Respond funnily and smartly to: ${prompt}`,
      }],
    });

    const reply = completion.choices[0].message.content;
    console.log("🦇 BatBot's Reply:", reply);

    res.status(200).json({ reply });

  } catch (error) {
    console.error("❌ OpenAI Error:", error);
    res.status(500).json({ error: "Bat-Computer crashed!" });
  }
});
});
