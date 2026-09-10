const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// =====================================================
// CAREERPATH AI SYSTEM PROMPT
// =====================================================

const SYSTEM_PROMPT = `
You are CareerPath AI, an AI career guidance assistant.

Your purpose is to help students with:

- Career selection
- Course selection
- Skills
- Colleges
- Exams
- Career roadmaps
- Higher education
- Future career opportunities

Rules:

1. Give simple and student-friendly answers.
2. Be practical and educational.
3. Do not claim that one career is absolutely best for everyone.
4. Explain different options when appropriate.
5. If information is uncertain, clearly say so.
6. Do not invent college, course, exam or eligibility information.
7. Encourage students to verify important admission and eligibility details.
8. Keep answers organized using headings and bullet points when useful.
9. Do not provide medical, legal or financial advice.
10. You are a career guidance assistant, not a replacement for teachers,
    counselors or official sources.

Always answer the student's actual question.
`;

// =====================================================
// GET AI REPLY
// =====================================================

const getAIReply = async (history, message) => {
  try {
    const formattedHistory = history.map((item) => ({
      role: item.role === "assistant" ? "model" : "user",
      parts: [
        {
          text: item.message
        }
      ]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",

      contents: [
        {
          role: "user",
          parts: [
            {
              text: SYSTEM_PROMPT
            }
          ]
        },

        ...formattedHistory,

        {
          role: "user",
          parts: [
            {
              text: message
            }
          ]
        }
      ]
    });

    return response.text || "Sorry, I could not generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);

    throw new Error("Failed to generate AI response");
  }
};

module.exports = {
  getAIReply
};
