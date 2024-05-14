import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { createWorker } from "tesseract.js";
import fs from "fs";
import path from "path";
import ApiError from "../utils/apiError.js";
import { Scan } from "../models/scan.model.js";

const extractTextFromImage = asyncHandler(async (req, res, next) => {
  const imageFile = req.file;

  const userData = JSON.parse(req.body.userData);

  const user_id = userData._id;

  if (!imageFile) {
    return res
      .status(400)
      .json(new ApiError(400, false, "Image file not provided"));
  }

  const language = req.body.language || "eng";
  const imageName = imageFile.originalname.split(".")[0];

  try {
    const worker = await createWorker(language);

    const {
      data: { text, render },
    } = await worker.recognize(imageFile.buffer);

    console.log(text);

    await worker.terminate();

    const textFilePath = path.join("public", "temp", `${imageName}.txt`);
    const textToWrite = render?.text || text;
    fs.writeFileSync(textFilePath, textToWrite);

    const scan = new Scan({
      text: text,
      user: user_id,
    });

    await scan.save();

    res.json(
      new ApiResponse(
        200,
        { extractedText: text },
        `Text extracted from image successfully in ${language} and saved to ${textFilePath}`
      )
    );
  } catch (error) {
    console.error("Error extracting text:", error);
    return res
      .status(400)
      .json(new ApiError(400, false, "Error extracting text"));
  }
});

export { extractTextFromImage };
