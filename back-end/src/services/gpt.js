const axios = require("axios");

const GPT_API_URL =
  "https://api.openai.com/v1/chat/completions";
const GPT_API_KEY = process.env.GPT_API_KEY;

async function takePrompt(prompt) {
  try {
    const response = await axios.post(
      GPT_API_URL,
      {
        messages: [{role: 'system', content: prompt}],
        model: "gpt-4"
      },
      {
        headers: { Authorization: `Bearer ${GPT_API_KEY}` }
      }
    );

    console.log(response);
    console.log(response.data.choices[0])
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling GPT API:', error.response ? error.response.data : error);
    return { error: 'Error calling GPT API' };
  }
  
}

module.exports = { takePrompt };
