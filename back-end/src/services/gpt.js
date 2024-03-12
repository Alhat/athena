const axios = require("axios");

const GPT_API_URL =
  "https://api.openai.com/v1/engines/davinci-codex/completions";
const GPT_API_KEY = process.env.GPT_API_KEY;

async function getGPTResponse(prompt) {
  try {
    const response = await axios.post(
      GPT_API_URL,
      {
        prompt: prompt,
        max_tokens: 100,
      },
      {
        headers: { Authorization: `Bearer ${GPT_API_KEY}` }
      }
    );

    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error calling GPT API: ' + error);
    return { error: 'Error calling GPT API' };
  }
  
}

module.exports = { getGPTResponse };