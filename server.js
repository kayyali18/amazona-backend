import express from "express";
import data from "./data.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/api/v1/products", (req, res) => {
  res.send(data.products);
});

app.get("/", (req, res) => {
  res.send(`Server is ready and running on port: ${PORT} `);
});

app.listen(PORT, () => {
  console.log("Served at http://localhost:8080");
});
