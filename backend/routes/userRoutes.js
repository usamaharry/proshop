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
import { isAuthorized, isAdmin } from "../midllewares/auth.js";

const router = express.Router();

router.route("/").get(isAuthorized, isAdmin, getUsers);
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/logout").post(isAuthorized, logoutUser);
router
  .route("/profile")
  .get(isAuthorized, getUserProfile)
  .put(isAuthorized, updateUserProfile);
router
  .route("/:id")
  .put(isAuthorized, isAdmin, updateUser)
  .delete(isAuthorized, isAdmin, deleteUser)
  .get(isAuthorized, isAdmin, getUserById);

export default router;
