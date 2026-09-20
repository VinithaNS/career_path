const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You are CareerPath AI, an expert career counselor for Indian students.
Help students make informed decisions regarding:
1. 10th-grade crossroads: Choosing 11th standard groups (Bio-Maths, Computer Science, Commerce, Arts) vs 3-Year Polytechnic Diplomas.
2. College departments, degrees (B.E/B.Tech, MBBS, B.Sc, B.Com), and higher study roadmaps.
3. Industry skills, job roles, and future career opportunities.
Provide structured, concise, and inspiring answers.`;

const getAIReply = async (historyForAI = [], trimmedMessage) => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error(
      "CRITICAL: GROQ_API_KEY is missing in backend environment variables (.env)"
    );
    throw new Error("GROQ_API_KEY is not configured in backend");
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...historyForAI
      .filter((m) => m && m.message)
      .map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.message)
      })),
    { role: "user", content: String(trimmedMessage) }
  ];

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey.trim()}`
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.7,
      max_tokens: 1024
    })
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Groq API Error details:", data);
    throw new Error(
      data?.error?.message || `Groq request failed (${response.status})`
    );
  }

  const reply = data?.choices?.[0]?.message?.content;
  if (!reply) throw new Error("Groq returned empty text");
  return reply.trim();
};

module.exports = { getAIReply };
