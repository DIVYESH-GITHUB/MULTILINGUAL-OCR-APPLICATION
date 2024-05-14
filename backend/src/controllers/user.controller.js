import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";
import crypto from "crypto";
import fs from "fs";
import { Scan } from "../models/scan.model.js";

const generateToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, userName, password, confirmPassword } = req.body;

  // Email validation
  if (!email) {
    return res.status(400).json(new ApiError(400, false, "Email not provided"));
  }
  if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    return res.status(400).json(new ApiError(400, false, "Email is not valid"));
  }

  // Username validation
  if (!userName) {
    return res
      .status(400)
      .json(new ApiError(400, false, "Username not provided"));
  }
  if (!userName.match("^[a-z0-9_-]{3,16}$")) {
    return res
      .status(400)
      .json(new ApiError(400, false, "Username is not valid"));
  }

  // Password validation
  if (!password) {
    return res
      .status(400)
      .json(new ApiError(400, false, "Password not provided"));
  }
  if (password.length <= 6) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          false,
          "Password length should be more than 6 characters"
        )
      );
  }

  if (password != confirmPassword) {
    return res
      .status(400)
      .json(
        new ApiError(400, false, "Password and confirm password doesn't match")
      );
  }

  // check is user already exist
  const existingUser = await User.findOne({
    $or: [{ userName: userName }, { email: email }],
  });

  if (existingUser) {
    return res
      .status(403)
      .json(
        new ApiError(403, false, "User with email or username already exist")
      );
  }

  const verificationToken = generateToken();

  // creating a new user
  const user = await User.create({
    email,
    userName,
    password,
    verificationToken,
  });

  // check if user created and removing the password field
  const createdUser = await User.findById(user._id).select(
    "-password -verificationToken"
  );

  if (!createdUser) {
    return res
      .status(500)
      .json(
        new ApiError(500, false, "Something went wrong while registering user")
      );
  }

  await sendVerificationEmail(email, verificationToken);

  // return final response along with user details
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdUser,
        "User registered successfully. Email is sent to you account, Please verify your email before logging in"
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { emailOrUsername, password } = req.body;

  // email or username validation
  if (!emailOrUsername) {
    return res
      .status(400)
      .json(new ApiError(400, false, "Email or user name is not specified"));
  }

  // password validation
  if (!password) {
    return res
      .status(400)
      .json(new ApiError(400, false, "Password is not specified"));
  }

  // check if given user with given username or email exist
  const user = await User.findOne({
    $or: [{ email: emailOrUsername }, { userName: emailOrUsername }],
  });

  if (!user) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          false,
          "User with specified Email or username doesn't exist"
        )
      );
  }

  if (!user.isVerified) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          false,
          "User is not verified, please verify your email"
        )
      );
  }

  // check password
  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json(new ApiError(400, false, "Invalid credentials"));
  }

  // remove the password field
  const loggedInuser = await User.findById(user._id).select("-password");

  // generate ascess token
  const accessToken = user.generateAccessToken();

  // return user along with access token
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: loggedInuser,
        accessToken: accessToken,
      },
      "User logged in successfully"
    )
  );
});

const verfiyToken = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    const errorFilePath =
      "C:\\Users\\divye\\OneDrive\\Desktop\\6TH_SEM_SGP\\backend\\src\\utils\\verification-error.html";
    const errorHtmlContent = fs.readFileSync(errorFilePath, "utf8");

    return res.status(400).send(errorHtmlContent);
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save({ validateBeforeSave: false });

  const filePath =
    "C:\\Users\\divye\\OneDrive\\Desktop\\6TH_SEM_SGP\\backend\\src\\utils\\verification-success.html";
  const htmlContent = fs.readFileSync(filePath, "utf8");

  return res.status(200).send(htmlContent);
});

const history = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  const scans = await Scan.find({ user: _id });
  if (scans.length > 0) {
    return res.status(200).json(new ApiResponse(200, scans, ""));
  } else {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No scanned images found"));
  }
});

export { registerUser, loginUser, verfiyToken, history };
