import userModel from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  secure: false, // For production make it to true
  // sameSite: "strict",
};

const signUpUser = async (req, resp) => {
  const { email, password, role = "USER" } = req.body;
  if (!email) {
    return resp.status(400).json({ message: "Email is required" });
  }
  try {
    // Check for existing email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return resp.status(400).json({ message: "Account Already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const signUpUserObj = {
      email,
      password: hashedPassword,
      role,
    };
    await userModel.create(signUpUserObj);
    return resp.status(201).json({ message: "Account created" });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "something went wrong" });
  }
};

const generateToken = (user) => {
  const accessToken = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );
  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};

// Refreshing AccesToken
const refreshAccessToken = async (req, resp) => {
  const token = req.cookies?.refreshToken;
  if (!token)
    return resp
      .status(401)
      .json({ message: "Session Expired Please Sign in Agagin" });
  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  const user = await userModel.findById({ _id: decoded?._id });
  if (!user)
    return resp
      .status(401)
      .json({ message: "Session Expired Please Sign in Agagin" });

  if (token !== user.refreshToken)
    return resp
      .status(401)
      .json({ message: "Session Expired Please Sign in Agagin" });
  const { refreshToken, accessToken } = generateToken(user);
  return resp
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .status(200)
    .json({ accessToken, refreshToken });
};

const loginUser = async (req, resp) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) return resp.status(404).json({ message: "Invalid Credentails" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return resp.status(404).json({ message: "Invalid Credentails" });
  const { accessToken, refreshToken } = generateToken(user);
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: true });
  return resp
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .status(200)
    .json({ message: "Login successfull" });
};

const logOut = async (req, resp) => {
  const id = req.user._id;
  const user = await userModel.findByIdAndUpdate(
    { _id: id },
    {
      $set: { refreshToken: "" },
    },
    { new: true }
  );
  console.log(user);

  return resp
    .status(200)
    .clearCookie("refreshToken", cookieOptions)
    .clearCookie("accessToken", cookieOptions)
    .json({ message: "User logged out" });
};

export { signUpUser, loginUser, refreshAccessToken, logOut };
