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
          `http://localhost:5000/api/scenarios/${id}`,
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
    try {
      const token = localStorage.getItem("token")

      const res = await axios.post(
        "http://localhost:5000/api/answers",
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

      // go to result page
      navigate(`/result/${res.data._id}`)
    } catch (err) {
      console.log(err.response?.data)
      alert("Submission failed")
    }
  }

  if (loading) return <h2>Loading...</h2>

  return (
    <div style={{ padding: "20px" }}>
      <h2>{scenario.title}</h2>
      <p>{scenario.description}</p>

      <textarea
        placeholder="Write your answer..."
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        rows={6}
        style={{ width: "100%", marginTop: "10px" }}
      />

      <br />

      <button
        onClick={handleSubmit}
        style={{ marginTop: "10px", padding: "10px" }}
      >
        Submit Answer
      </button>
    </div>
  )
}

export default Scenario