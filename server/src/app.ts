import express from "express";
import cors from "cors";
import path from "path";

import getEnvVars from "./config/config";
import mainRouter from "./routes/routes";
const publicFolder = path.join(__dirname, "public");
const indexHtml = path.join(publicFolder, "index.html");
const manifestJson = path.join(publicFolder, "manifest.json");

const { devMode } = getEnvVars();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// static frontend routing
app.use(express.static(publicFolder));

// main router call
app.use("/api/v1", mainRouter);

// index.html and manifest.json routing for any route
if (!devMode) {
  app.get("/manifest.json", (req, res) => {
    res.sendFile(manifestJson);
  });
  app.get("*", (req, res) => {
    res.sendFile(indexHtml);
  });
}
// FIXME: this ugly way to serve manifest.json is currently the only one which is working for me

// TODO - error handler

export default app;
