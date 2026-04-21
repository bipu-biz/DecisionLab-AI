import express from 'express'
import { getScenarios, createScenario } from '../controllers/scenario.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

const router = express.Router()

router.get("/", authMiddleware, getScenarios)
router.post("/", authMiddleware, createScenario)

export default router