import express from "express";
import doctorRoutes from "./routes/doctorRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use("/doctorAPI", doctorRoutes);
app.get("/ping", (req, res) => res.send("pong"));
app.get('/', function (req, res) {
  return res.send("Hello World!");
});
app.post("/test", (req, res) => {
  console.log(req.body);
  res.json({ OK: "OK" });
});

export default app;
