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

export const getScenarioById = async (req, res) => {
  try {
    const scenario = await Scenario.findById(req.params.id)

    if (!scenario) {
      return res.status(404).json({ message: "Scenario not found" })
    }

    res.json(scenario)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}