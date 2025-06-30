const { onRequest } = require("firebase-functions/v2/https");
const cors = require("cors")({ origin: true });

exports.batBot = onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      const prompt = req.body.prompt?.toLowerCase() || "";

      let reply;

      if (prompt.includes("pizza")) {
        reply = "🦇 Justice tastes like pepperoni. Here's how to make it: dough, sauce, cheese, oven. Boom.";
      } else if (prompt.includes("love")) {
        reply = "🦇 Love? I don’t do soft. But I protect. Always.";
      } else if (prompt.includes("exam") || prompt.includes("study")) {
        reply = "🦇 Study like Gotham depends on it. Because it does.";
      } else {
        // Fun fallback
        reply = `🦇 I'm Batman. Here's my take: "${prompt}"? Sounds like something only the Batmobile can handle.`;
      }

      res.status(200).json({ reply });
    } catch (error) {
      console.error("Mock BatBot Error:", error);
      res.status(500).json({ error: "🦇 The Batcomputer crashed." });
    }
  });
});
