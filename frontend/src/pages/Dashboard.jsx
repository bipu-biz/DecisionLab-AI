import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Dashboard() {
  const [scenarios, setScenarios] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const handleLogout = () => {
  localStorage.removeItem("token")
  navigate("/")
}

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await axios.get("https://decisionlab-ai.onrender.com/api/scenarios", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setScenarios(res.data)
      } catch (err) {
        console.log("Error:", err.response?.data || err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchScenarios()
  }, [])

  if (loading) return <h2>Loading...</h2>

  return (
    <div className="min-h-screen bg-gray-100 p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
        Logout
      </button>
    </div>

    {scenarios.length === 0 ? (
      <p>No scenarios found</p>
    ) : (
      <div className="grid gap-6">
        {scenarios.map((s) => (
          <div
            key={s._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-600 mb-4">{s.description}</p>

            <button
              onClick={() => navigate(`/scenario/${s._id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Solve
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
  )
}

export default Dashboard