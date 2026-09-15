// services/aiService.js
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You are CareerPath AI, a friendly career guidance assistant for
Indian students choosing 11th-grade groups, degrees, colleges, and career paths.
Answer clearly and accurately.`;

// historyForAI: array of { role: "user" | "assistant", message: "..." }
// trimmedMessage: the new user message string
const getAIReply = async (historyForAI, trimmedMessage, retries = 2) => {
  if (!GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing in environment variables");
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...historyForAI.map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.message
    })),
    { role: "user", content: trimmedMessage }
  ];

  for (let attempt = 0; attempt <= retries; attempt++) {
    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages
      })
    });

    const data = await response.json();

    if (response.ok) {
      const reply = data?.choices?.[0]?.message?.content;
      if (!reply) throw new Error("Groq returned no text in the response");
      return reply;
    }

    if (response.status === 429 && attempt < retries) {
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      continue;
    }

    throw new Error(
      data?.error?.message || `Groq request failed (${response.status})`
    );
  }
};

module.exports = { getAIReply };
