import Scenario from '../models/scenario.model.js'

export const getScenarios = async (req, res) => {
  try{
    const scenarios = await Scenario.find()

    res.json(scenarios)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createScenario = async (req, res) => {
  try{
    const { title, description, difficulty } = req.body

    const scenario = await Scenario.create({
      title,
      description,
      difficulty
    })

    res.status(201).json(scenario)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}