import express from "express";
import { projectRouter } from "./routes/project.router";

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/images", projectRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});