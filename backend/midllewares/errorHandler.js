import AppError from "../models/AppError.js";
import errorCodes from "../utils/errorCodes.js";

const errorHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode && error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  if (error.kind === "ObjectId") {
    return res.status(400).json({
      message: "Requested data not found",
      errorCode: errorCodes.NOT_FOUND,
    });
  }

  res.status(500).json({
    message: error.message || "Something went wrong",
  });
};

export default errorHandler;
