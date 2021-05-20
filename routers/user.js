import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

import { generateToken } from "../utils.js";
import data from "../data.js";
import User from "../models/user.js";

const userRouter = express.Router();

/** GET */

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await User.deleteMany({});
    let createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

/** POST */
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      let match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const { _id, name, email, isAdmin } = user;
        res.send({ _id, name, email, isAdmin, token: generateToken(user) });
      }
    } else {
      res.status(401).send({ message: "Invalid Username/Password" });
    }
  })
);

export default userRouter;
