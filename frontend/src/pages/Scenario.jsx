import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"

function Scenario() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [scenario, setScenario] = useState(null)
  const [answerText, setAnswerText] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchScenario = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await axios.get(
          `https://decisionlab-ai.onrender.com/api/scenarios/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setScenario(res.data)
      } catch (err) {
        console.log(err.response?.data)
      } finally {
        setLoading(false)
      }
    }
    fetchScenario()
  }, [id])

  const handleSubmit = async () => {
    if (!answerText.trim()) {
        return alert("Please write an answer")
      }
    try {
      const token = localStorage.getItem("token")
      const res = await axios.post(
        "https://decisionlab-ai.onrender.com/api/answers",
        {
          scenarioId: id,
          answerText
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      navigate(`/result/${res.data._id}`)
    } catch (err) {
      console.log(err.response?.data)
      alert("Submission failed")
    }
  }
  if (loading) return <h2>Loading...</h2>
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
    <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-md">
      
      <h2 className="text-2xl font-bold mb-2">{scenario.title}</h2>
      <p className="text-gray-600 mb-6">{scenario.description}</p>

      <textarea
        placeholder="Write your answer here..."
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        rows={6}/>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
        Submit Answer
      </button>
    </div>
  </div>
  )
}

export default Scenario