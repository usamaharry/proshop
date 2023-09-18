import tryCatch from "../utils/tryCatch.js";

// @desc   User login
// @route POST /api/users/login
// @access public
export const loginUser = tryCatch(async (req, res, next) => {
  res.send("Login user");
});

// @desc   User Register
// @route POST /api/users/register
// @access public
export const registerUser = tryCatch(async (req, res, next) => {
  res.send("Register user");
});

// @desc   User Logout / clear cookie
// @route  POST /api/users/logout
// @access private
export const logoutUser = tryCatch(async (req, res, next) => {
  res.send("Logout user");
});

// @desc   Get user profile
// @route  Get /api/users/profile
// @access private
export const getUserProfile = tryCatch(async (req, res, next) => {
  res.send("user profile");
});

// @desc   update user profile
// @route  PUT /api/users/profile
// @access private
export const updateUserProfile = tryCatch(async (req, res, next) => {
  res.send("update user profile");
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
