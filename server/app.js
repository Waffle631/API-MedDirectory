import express from "express";
import doctorRoutes from "./routes/doctorRoute.js";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/doctorAPI", doctorRoutes);
app.get("/ping", (req, res) => res.send("pong"));
app.post("/test", (req, res) => {
  console.log(req.body);
  res.json({ OK: "OK" });
});

export default app;
