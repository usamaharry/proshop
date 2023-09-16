import express from "express";
import dotenv from "dotenv";

import connectDb from "./config/db.js";
import products from "./data/products.js";

dotenv.config();
connectDb(); //Connecting Mongo

const port = process.env.PORT;
const app = express();

app.get("/", (req, res, next) => {
  res.send("Api is running...");
});

app.get("/api/products", (req, res, next) => {
  res.json(products);
});

app.get("/api/product/:id", (req, res, next) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(port, () => console.log(`Server is running at ${port}`));
