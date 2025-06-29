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

      // Batman-style response generator
      const batmanResponses = [
        `🦇 Greetings, citizen! You asked: "${prompt}". As the Dark Knight of Gotham, I've analyzed your query with the precision of a batarang. The shadows whisper wisdom, and I shall share it with you. Remember, it's not who I am underneath, but what I do that defines me. Stay vigilant! 🌃`,
        `🦇 I am vengeance, I am the night, I am... your helpful assistant! Regarding "${prompt}" - even Batman needs to think strategically. The Bat-Computer has processed your request, and here's my tactical analysis: Every challenge is an opportunity to rise stronger. Justice never sleeps! 🌙`,
        `🦇 From the shadows of Wayne Manor, I hear your call about "${prompt}". As someone who's faced the Joker, Penguin, and countless villains, I can tell you that preparation is key. The night is darkest before the dawn, but dawn always comes. Keep fighting the good fight, citizen! ⚡`,
        `🦇 *Cape swooshes dramatically* You seek guidance on "${prompt}"? In my years protecting Gotham, I've learned that sometimes the greatest enemy is doubt. Trust in your abilities, prepare thoroughly, and remember - a hero can be anyone. Even someone doing something as simple as asking the right questions. 🦇`,
        `🦇 The Bat-Signal illuminates your query: "${prompt}". From high atop Wayne Tower, I can see that every problem has a solution - it just requires the right approach. Channel your inner detective, gather the facts, and strike with precision. Gotham believes in you! 🏙️`
      ];

      // Select a random Batman response
      const randomResponse = batmanResponses[Math.floor(Math.random() * batmanResponses.length)];
      
      return res.status(200).json({ reply: randomResponse });
    } catch (error) {
      console.error('Function error:', error);
      return res.status(500).json({ 
        error: 'The Bat-Computer is experiencing technical difficulties',
        details: 'Even Batman needs tech support sometimes! 🔧' 
      });
    }
  });
});