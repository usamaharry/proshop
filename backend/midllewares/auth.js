import jwt from "jsonwebtoken";
import tryCatch from "../utils/tryCatch.js";
import User from "../models/user.js";
import AppError from "../models/AppError.js";
import errorCodes from "../utils/errorCodes.js";

export const isAuthorized = tryCatch(async (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedToken.userId);
      return next();
    } catch (error) {
      throw new AppError(
        "Not Authorized, Invalid Token",
        errorCodes.INVALID_TOKEN,
        401
      );
    }
  }
  throw new AppError("Not Authorized, No Token", errorCodes.NO_TOKEN, 401);
});

export const isAdmin = tryCatch(async (req, res, next) => {
  if (req.user.isAdmin) return next();

  throw new AppError(
    "Not Authorized, Not Admin",
    errorCodes.NOT_AUTHORIZED,
    401
  );
});
