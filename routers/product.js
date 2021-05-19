import express from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import data from "../data.js";
import Product from "../models/product.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    let id = mongoose.Types.ObjectId.isValid(req.params.id);
    console.log(id);
    let product = id
      ? await Product.findById(mongoose.Types.ObjectId(req.params.id))
      : null;
    console.log(product, "Invalid ID");

    res.statusMessage = product
      ? "OK"
      : id
      ? "What?! Not Found. Dude...  Not cool"
      : "Freeze, Buster!! What are you trying to do? You look like a hacker, yes you do!";
    let statusCode = product ? 200 : id ? 404 : 400;

    product
      ? res.send(product)
      : res.status(statusCode).send({ res: res.statusMessage });
  })
);

export default productRouter;
