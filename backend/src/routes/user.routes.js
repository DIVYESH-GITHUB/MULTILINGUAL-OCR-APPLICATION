import { Router } from "express";
import {
  history,
  loginUser,
  registerUser,
  verfiyToken,
} from "../controllers/user.controller.js";
const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/verify/:token").get(verfiyToken);

router.route("/history").post(history);

export default router;
