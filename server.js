import express from "express";
import dotenv from "dotenv";
import userRouter from "./routers/user.js";
import productRouter from "./routers/product.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Setup mongodb_url
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send(`Server is ready and running on port: ${PORT} `);
});

/** Routing */
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// User Router
app.use("/api/v1/users", userRouter);

// Product Router
app.use("/api/v1/products", productRouter);

app.listen(PORT, () => {
  console.log("Served at http://localhost:8080");
});
