import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Scenario from "./pages/Scenario"
import Result from "./pages/Result"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/scenario/:id" element={<Scenario />} />
      <Route path="/result/:id" element={<Result />} />
    </Routes>
  )
}

export default App