import { Router } from "express";
import { extractTextFromImage } from "../controllers/extractTextFromImage.controller.js";
import multer from "multer";

const router = Router();
const upload = multer(); // Create a multer instance

// POST route to extract text from an image
router
  .route("/extract-text")
  .post(upload.single("image"), extractTextFromImage);

export default router;
