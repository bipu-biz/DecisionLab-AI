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
    const score = Math.round(
        (parsed.clarity + parsed.correctness + parsed.depth) / 3)

    const answer = await Answer.create({
      user: req.user.userId,
      scenario: scenarioId,
      answerText,
      score: score,
      clarity: parsed.clarity,
      correctness: parsed.correctness,
      depth: parsed.depth,
      feedback: parsed.feedback,
      improvements: parsed.improvements
    })

    res.status(201).json(answer)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}