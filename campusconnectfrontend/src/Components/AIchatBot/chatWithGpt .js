import axios from 'axios';
import convertObjectToString from './convertObjectToString';

const openaiApiKey = "sk-proj-dtVc9gi5ccQSzVHSF7qfT3BlbkFJ73eYILwRORymRvr3Tmxs";
const openaiUrl = "https://api.openai.com/v1/chat/completions";


const chatWithGpt = async (prompt) => {

  // const jsonString = convertObjectToString(userData);
  try {
    const requestData = {
      model: "gpt-4-turbo",
      messages: [
        // { 
        //   role: "system", 
        //   content: `${jsonString} This is user data, call them by their username. Be precise about their contacts.` 
        // },
        { 
          role: "system", 
          content: "Keep your responses concise and limited to 3-4 lines. The input date is stored as a Unix timestamp using Date.now(). Convert this timestamp to a human-readable date format (YYYY-MM-DD)." 
        },
        { 
          role: "user", 
          content: prompt 
        },
        { 
          role: "assistant", 
          content: "Remember to take breaks and stay hydrated while working. Your health is important!" 
        }
      ]
      };

  

    const response = await axios.post(
      openaiUrl,
      requestData,
      {
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const gptResponse = response.data.choices[0].message.content.trim();
    return gptResponse;
  } catch (error) {
    console.error("Error:", error);
    if (error.response) {
      console.error("Response Data:", error.response.data);
    }
    return `Error: ${error.message}`;
  }
};

export default chatWithGpt;

