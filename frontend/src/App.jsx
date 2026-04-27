import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Scenario from "./pages/Scenario"
import Result from "./pages/Result"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard"
       element={ <ProtectedRoute>
                   <Dashboard />
                  </ProtectedRoute> } />
      <Route path="/scenario/:id"
       element={ <ProtectedRoute>
                   <Scenario />
                  </ProtectedRoute> } />
      <Route path="/result/:id"
       element={ <ProtectedRoute>
                   <Result />
                  </ProtectedRoute> } />
    </Routes>
  )
}

export default App