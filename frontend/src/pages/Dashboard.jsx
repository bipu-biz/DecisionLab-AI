import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Dashboard() {
  const [scenarios, setScenarios] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await axios.get("http://localhost:5000/api/scenarios", {
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
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      {scenarios.length === 0 ? (
        <p>No scenarios found</p>
      ) : (
        scenarios.map((s) => (
          <div
            key={s._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "8px"
            }}
          >
            <h3>{s.title}</h3>
            <p>{s.description}</p>

            <button
              onClick={() => navigate(`/scenario/${s._id}`)}
              style={{
                padding: "8px 12px",
                cursor: "pointer"
              }}
            >
              Solve
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default Dashboard