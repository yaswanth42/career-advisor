// Express server setup for Gemini Chat API

import express from 'express';
import bodyParser from 'body-parser';
import geminiChat from './geminiChat.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/gemini', geminiChat);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
