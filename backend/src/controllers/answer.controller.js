import Answer from "../models/answer.model.js"

export const submitAnswer = async (req, res) => {
  try {
    const { scenarioId, answerText } = req.body

    const answer = await Answer.create({
      user: req.user.userId,
      scenario: scenarioId,
      answerText
    })

    const score = Math.floor(Math.random() * 10) + 1

    const feedback = "Good approach, but you can improve by considering scalability and edge cases."

    answer.score = score
    answer.feedback = feedback

    await answer.save()
    res.status(201).json(answer)
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}