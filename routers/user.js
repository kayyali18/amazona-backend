import express from "express";

const userRouter = express.Router();

userRouter.get("/seed", async (req, res) => {
  res.json({ hello: "hey" });
});

export default userRouter;
