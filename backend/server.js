import express from "express";
import dotenv from "dotenv";

import connectDb from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import errorHandler from "./midllewares/errorHandler.js";

dotenv.config();
connectDb(); //Connecting Mongo

const port = process.env.PORT;
const app = express();

app.get("/", (req, res, next) => {
  res.send("Api is running...");
});

app.use("/api/products", productRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running at ${port}`));
