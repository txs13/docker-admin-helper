import express from "express";
import mainRouter from "./routes/routes";
import cors from "cors";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// main router call
app.use("/api/v1", mainRouter);

// static frontend routing
app.use(
  "/jquery",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist"))
);
app.use(
  "/popper",
  express.static(path.join(__dirname, "../node_modules/@popperjs/core/dist"))
);
app.use("/", express.static(path.join(__dirname, "public")));
// so far this is the best possible way I found to redirect any browser request to the maim page
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// TODO - error handler

export default app;
