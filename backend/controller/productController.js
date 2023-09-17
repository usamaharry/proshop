import Product from "../models/product.js";
import tryCatch from "../utils/tryCatch.js";

// @desc   Fetch All Prodcuts
// @route  /api/products
// @access public
export const getAllProducts = tryCatch(async (req, res, next) => {
  const prodcuts = await Product.find({});
  res.json(prodcuts);
});

// @desc   Get Product By Id
// @route  /api/products/:id
// @access public
export const getProductById = tryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json(product);
});
