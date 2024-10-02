import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
  commentCreateValidation,
} from "./validations.js";

import { handleValidationErrors, checkAuth } from "./utils/index.js";

import {
  PostController,
  UserController,
  CommentController,
} from "./controllers/index.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("db OK"))
  .catch((err) => console.log("db Err", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

//auth/login
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

//upload
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

//tags
app.get("/tags", PostController.getLastTags);

//posts
app.get("/posts", PostController.getAll);
app.get("/posts/tags", PostController.getLastTags);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

//comments
app.post(
  "/comments",
  checkAuth,
  commentCreateValidation,
  handleValidationErrors,
  CommentController.create
);
app.get("/posts/:id/comments", CommentController.getCommentsByPost);
app.patch("/comments/:id/", checkAuth, CommentController.likeComment);
app.get("/comments/:id", CommentController.listOflikes);
app.delete("/comments/:id", checkAuth, CommentController.remove);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server OK running on port ${process.env.PORT}`);
});
