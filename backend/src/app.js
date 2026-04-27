import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from './routes/user.routes.js'
import scenarioRoutes from './routes/scenario.routes.js'
import answerRoutes from './routes/answer.routes.js'
import cors from "cors"


const app = express();

app.use(express.json());

app.use(cors({
  origin: "https://decision-lab-ai.vercel.app"
}))

app.use("/api/auth", authRoutes);
app.use("/api/user",userRoutes)
app.use("/api/scenarios", scenarioRoutes)
app.use("/api/answers", answerRoutes)

app.get("/", (req, res) => {
  res.send("API Running...");
});

export default app