import express from "express";
import mainRouter from "./routes/routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// main router call
app.use("/api/v1", mainRouter);

// static frontend routing
app.use(express.static("public"));

// TODO - error handler

export default app;
