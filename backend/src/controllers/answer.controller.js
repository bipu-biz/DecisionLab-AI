import Answer from "../models/answer.model.js"

export const submitAnswer = async (req, res) => {
  try {
    const { scenarioId, answerText } = req.body

    const answer = await Answer.create({
      user: req.user.userId,
      scenario: scenarioId,
      answerText
    })

    res.status(201).json(answer)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}