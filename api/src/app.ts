import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { projectRouter } from "./routes/project.router";

let corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept-Encoding',
    'x-csrf-token',
  ],
  exposedHeaders: [
    'Content-Length',
    'X-Request-Id',
    'Set-Cookie',
  ],
  credentials: true,
  maxAge: 3600,
  preflightContinue: false,
  optionsSuccessStatus: 204,
}

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/projects", projectRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});