import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import User from '../models/user.model.js'

const router = express.Router()

router.get("/me", authMiddleware, async (req, res) => {
  try{
    const user = await User.findById(req.user.userId).select("-password")

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router