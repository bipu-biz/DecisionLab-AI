import axios from "axios"

export const evaluateAnswer = async (answerText) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `Evaluate this answer and return ONLY JSON:
{
  "overallScore": number (1-10),
  "clarity": number (1-10),
  "correctness": number (1-10),
  "depth": number (1-10),
  "feedback": string,
  "improvements": string
}

Answer:
${answerText}`
          }
        ],
        temperature: 0.3
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )

    return response.data.choices[0].message.content
  } catch (error) {
    console.log(error.response.data)
    throw error
  }
}