// Gemini Chat API integration for Node.js/Express
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/chat', async (req, res) => {
  try {
    const { message, userContext } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `User context: ${JSON.stringify(userContext)}\nUser: ${message}\nAI:`;
    const result = await model.generateContent(prompt);
    res.json({ reply: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: 'Gemini API error', details: error.message });
  }
});

export default router;
