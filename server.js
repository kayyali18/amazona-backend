import express from "express";

import userRouter from "./routers/user.js";
import data from "./data.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/api/v1/products", (req, res) => {
  res.status(200).send(data.products);
});

app.get("/api/v1/products/:id", (req, res) => {
  const product = data.products.find((item) => item._id === req.params.id);

  res.statusMessage = "Product Not Found";
  product ? res.status(200).send(product) : res.status(404).send();
});

app.get("/", (req, res) => {
  res.send(`Server is ready and running on port: ${PORT} `);
});

app.listen(PORT, () => {
  console.log("Served at http://localhost:8080");
});

app.use("/api/v1/users", userRouter);
