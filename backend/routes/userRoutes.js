import express from "express";

import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/userController.js";

const router = express.Router();

router.route("/").get(getUsers);
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/logout").post(logoutUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/:id").put(updateUser).delete(deleteUser).get(getUserById);

export default router;
