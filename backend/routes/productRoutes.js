import express from "express";
import mongoose from "mongoose";

import Product from "../models/product.js";
import tryCatch from "../utils/tryCatch.js";

const router = express.Router();

router.get(
  "/",
  tryCatch(async (req, res, next) => {
    const prodcuts = await Product.find({});
    res.json(prodcuts);
  })
);

router.get(
  "/:id",
  tryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  })
);

export default router;
