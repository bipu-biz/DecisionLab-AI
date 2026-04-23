import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
  console.log("sending:", { email, password })

  const res = await axios.post("http://localhost:5000/api/auth/login", {
    email,
    password
  })

  console.log("response:", res.data)

  localStorage.setItem("token", res.data.token)

  navigate("/dashboard")
} catch (err) {
  console.log("error:", err.response?.data)
  alert(err.response?.data?.message || "Login failed")
}
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login