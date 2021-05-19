import express from "express";

import userRouter from "./routers/user.js";
import data from "./data.js";
import mongoose from "mongoose";

const app = express();
// Setup mongodb_url
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const PORT = process.env.PORT || 8080;

/** GET */
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

/** Routing */
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// User Router
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log("Served at http://localhost:8080");
});
