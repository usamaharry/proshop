import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import products from "./data/products.js";
import users from "./data/users.js";
import connectDb from "./config/db.js";

import Product from "./models/product.js";
import User from "./models/user.js";
import Order from "./models/order.js";

dotenv.config();
connectDb();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id; //Getting admin user ID

    //Linking products to admin user
    const samepleProducts = products.map((p) => {
      return { ...p, user: adminUser };
    });

    await Product.insertMany(samepleProducts);

    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    console.log("Data Destroyed".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
