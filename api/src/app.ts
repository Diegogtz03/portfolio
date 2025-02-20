import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { projectRouter } from "./routes/project.router";
import { musicRouter } from "./routes/music.router";
import { skillsRouter } from "./routes/skills.router";
import { authenticateApiKey } from "./utils/middleware";
import { mediaRouter } from "./routes/media.router";

let corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept-Encoding",
    "x-csrf-token",
  ],
  exposedHeaders: ["Content-Length", "X-Request-Id", "Set-Cookie"],
  credentials: true,
  maxAge: 3600,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const app = express();
// app.use(authenticateApiKey);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Welcome to Guti's API");
});

app.use("/projects", projectRouter);
app.use("/music", musicRouter);
app.use("/skills", skillsRouter);
app.use("/media", mediaRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
