import express from "express"
import { submitAnswer } from "../controllers/answer.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/", authMiddleware, submitAnswer)

export default router