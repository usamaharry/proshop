import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import tryCatch from "../utils/tryCatch.js";
import User from "../models/user.js";
import AppError from "../models/AppError.js";
import errorCodes from "../utils/errorCodes.js";

// @desc   User login
// @route POST /api/users/login
// @access public
export const loginUser = tryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  console.log(email);

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
    });

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }

  res.status(401);
  throw new AppError(
    "Invalid Credentials",
    errorCodes.INVALID_LOGIN_CREDENTIALS,
    401
  );
});

// @desc   User Register
// @route POST /api/users/register
// @access public
export const registerUser = tryCatch(async (req, res, next) => {
  const { name, email, password } = req.body;

  const isUserAlreadyRegistered = await User.findOne({ email });

  if (isUserAlreadyRegistered)
    throw new AppError(
      "User already registered",
      errorCodes.ALREADY_REGISTERED,
      400
    );

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    throw new AppError("Invalid User Data", errorCodes.INVALID_USER_DATA, 400);
  }
});

// @desc   User Logout / clear cookie
// @route  POST /api/users/logout
// @access private
export const logoutUser = tryCatch(async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
});

// @desc   Get user profile
// @route  Get /api/users/profile
// @access private
export const getUserProfile = tryCatch(async (req, res, next) => {
  const user = req.user;

  if (!user) throw new AppError("User not found", errorCodes.NOT_FOUND, 404);

  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// @desc   update user profile
// @route  PUT /api/users/profile
// @access private
export const updateUserProfile = tryCatch(async (req, res, next) => {
  const user = req.user;

  if (!user) throw new AppError("User not found", errorCodes.NOT_FOUND, 404);

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = bcrypt.hashSync(req.body.password, 10);
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

// @desc   get all users
// @route  GET /api/users
// @access private/admin
export const getUsers = tryCatch(async (req, res, next) => {
  res.send("get users");
});

// @desc     get user by ID
// @route    GET /api/users/:id
// @access   private/admin
export const getUserById = tryCatch(async (req, res, next) => {
  res.send("get User By Id");
});

// @desc     update user
// @route    PUT /api/users/:id
// @access   private/admin
export const updateUser = tryCatch(async (req, res, next) => {
  res.send("update user");
});

// @desc     delte user
// @route    DELETE /api/users/:id
// @access   private/admin
export const deleteUser = tryCatch(async (req, res, next) => {
  res.send("delete user");
});
