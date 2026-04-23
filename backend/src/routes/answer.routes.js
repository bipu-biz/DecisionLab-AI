import express from "express"
import { submitAnswer, getAnswerById } from "../controllers/answer.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/", authMiddleware, submitAnswer)
router.get("/:id", authMiddleware, getAnswerById)

export default router