import express from 'express'
import { getScenarios, createScenario, getScenarioById } from '../controllers/scenario.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

const router = express.Router()

router.get("/", authMiddleware, getScenarios)
router.post("/", authMiddleware, createScenario)
router.get("/:id", authMiddleware, getScenarioById)

export default router