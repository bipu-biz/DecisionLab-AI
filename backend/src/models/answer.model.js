import mongoose from "mongoose"

const answerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    scenario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scenario",
      required: true
    },
    answerText: {
      type: String,
      required: true
    },
    score: {
      type: Number
    },
    feedback: {
      type: String
    },
    clarity: {
      type: Number
    },
    correctness: {
      type: Number
    },
    depth: {
      type: Number
    },
    improvements: {
      type: String
    }
  },
  { timestamps: true }
)

const Answer = mongoose.model("Answer", answerSchema)

export default Answer