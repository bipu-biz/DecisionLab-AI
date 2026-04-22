import Answer from "../models/answer.model.js"
import { evaluateAnswer } from "../services/ai.service.js"

export const submitAnswer = async (req, res) => {
  try {
    const { scenarioId, answerText } = req.body
    const aiResponse = await evaluateAnswer(answerText)
    const clean = aiResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()
    const parsed = JSON.parse(clean)
    const score = parsed.score <= 1 ? Math.round(parsed.score * 10) : parsed.score

    const answer = await Answer.create({
      user: req.user.userId,
      scenario: scenarioId,
      answerText,
      score: score,
      feedback: parsed.feedback
    })

    res.status(201).json(answer)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}