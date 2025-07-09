const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function getGeminiResponse(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  try {
    const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await res.json();
    console.log("Gemini response:", data);

    if (
      data &&
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      return data.candidates[0].content.parts[0].text;
    } else if (data.error) {
      return `Error: ${data.error.message}`;
    } else {
      return "No valid response from Gemini.";
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Failed to contact Gemini.";
  }
}
