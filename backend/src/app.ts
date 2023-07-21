/**
 * Defines routes.
 */

import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Home");
});

export default app;