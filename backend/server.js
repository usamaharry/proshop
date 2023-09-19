import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDb from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./midllewares/errorHandler.js";

dotenv.config();
connectDb(); //Connecting Mongo

const port = process.env.PORT;
const app = express();

//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Cookie Parser
app.use(cookieParser());

app.get("/", (req, res, next) => {
  res.send("Api is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.use("*", (req, res, next) => {
  res.json({
    message: "Invalid api",
  });
});

app.listen(port, () => console.log(`Server is running at ${port}`));
