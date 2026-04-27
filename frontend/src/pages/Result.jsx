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
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
    <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-md">

      <h2 className="text-2xl font-bold mb-6 text-center">Your Result</h2>

      <div className="text-center mb-6">
        <p className="text-gray-500">Score</p>
        <h1 className="text-5xl font-bold text-blue-500">
          {result.score}/10
        </h1>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Feedback</h3>
        <p className="text-gray-600">{result.feedback}</p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Clarity</p>
          <p className="text-xl font-semibold">{result.clarity}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Correctness</p>
          <p className="text-xl font-semibold">{result.correctness}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Depth</p>
          <p className="text-xl font-semibold">{result.depth}</p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Improvements</h3>
        <p className="text-gray-600">{result.improvements}</p>
      </div>
    </div>
  </div>
  )
}

export default Result