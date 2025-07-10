// Gemini API integration
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function sendToGemini(userMessage) {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a helpful AI assistant. Respond to the user's message in a conversational, natural way. Keep responses concise but informative. Format responses with proper line breaks and bullet points when appropriate.

User: ${userMessage}`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      let aiResponse = data.candidates[0].content.parts[0].text;
      
      // Clean up the response
      aiResponse = aiResponse.trim();
      
      // Remove markdown formatting if present
      aiResponse = aiResponse.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold
      aiResponse = aiResponse.replace(/\*(.*?)\*/g, '$1'); // Remove italic
      aiResponse = aiResponse.replace(/`(.*?)`/g, '$1'); // Remove code blocks
      
      return aiResponse;
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}
