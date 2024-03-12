// gptController.js
const { getGPTResponse } = require('../services/gpt');

async function getGPTResponse(req, res) {
  const prompt = req.body.prompt;
  const response = await getGPTResponse(prompt);
  res.json({ response: response });
}

module.exports = { getGPTResponse };
