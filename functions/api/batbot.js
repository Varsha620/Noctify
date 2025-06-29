const { onRequest } = require("firebase-functions/v2/https");
const cors = require("cors")({ origin: true });

exports.batBot = onRequest(async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return cors(req, res, () => res.status(204).send(''));
  }

  return cors(req, res, async () => {
    try {
      // Validate request method
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      // Parse and validate request body
      if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ error: 'Invalid request body' });
      }

      const { prompt } = req.body;
      
      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Prompt must be a string' });
      }

      // Process the prompt
      const reply = `🦇 I hear your call... Here's what I think: ${prompt.toUpperCase()}`;
      
      return res.status(200).json({ reply });
    } catch (error) {
      console.error('Function error:', error);
      return res.status(500).json({ 
        error: 'Internal server error',
        details: error.message 
      });
    }
  });
});