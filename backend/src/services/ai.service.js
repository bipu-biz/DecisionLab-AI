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
  "score": number,
  "feedback": string
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