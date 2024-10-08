import { validationResult } from "express-validator";
import dotenv from "dotenv";

dotenv.config();

export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  next();
};
