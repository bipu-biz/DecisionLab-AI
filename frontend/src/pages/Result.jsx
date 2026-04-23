import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

function Result() {
  const { id } = useParams()

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await axios.get(
          `http://localhost:5000/api/answers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setResult(res.data)
      } catch (err) {
        console.log(err.response?.data)
      } finally {
        setLoading(false)
      }
    }

    fetchResult()
  }, [id])

  if (loading) return <h2>Loading...</h2>

  return (
    <div style={{ padding: "20px" }}>
      <h2>Result</h2>

      <p><strong>Score:</strong> {result.score} / 10</p>

      <p><strong>Feedback:</strong></p>
      <p>{result.feedback}</p>

      <hr />

      <p><strong>Clarity:</strong> {result.clarity}</p>
      <p><strong>Correctness:</strong> {result.correctness}</p>
      <p><strong>Depth:</strong> {result.depth}</p>

      <p><strong>Improvements:</strong></p>
      <p>{result.improvements}</p>
    </div>
  )
}

export default Result