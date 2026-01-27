import userModel from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const isProd = process.env.NODE_ENV === "production";
const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
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
    { expiresIn: "15m" },
  );
  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );
  return { accessToken, refreshToken };
};

// Refreshing AccesToken
const refreshAccessToken = async (req, resp) => {
  try {
    const token = req.cookies?.refreshToken;
    // is refresh token available or not
    if (!token) return resp.sendStatus(401);
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await userModel.findById({ _id: decoded?._id });
    if (!user || user.refreshToken !== token) {
      return resp.status(401).json({ reason: "NEW_LOGIN" });
    }
    const { refreshToken: newRefreshToken, accessToken } = generateToken(user);
    await user.save();
    return resp
      .cookie("refreshToken", newRefreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ accessToken });
  } catch (error) {
    return resp.sendStatus(401);
  }
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
  user.forceLogoutReason = "NEW_LOGIN";
  await user.save({ validateBeforeSave: true });
  return resp
    .cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json(accessToken);
};
const me = async (req, resp) => {
  const { _id } = req.user;
  const user = await userModel
    .findById({ _id })
    .select("-password")
    .select("-refreshToken");
  return resp.status(200).json({ user });
};
const logOut = async (req, resp) => {
  await userModel.findByIdAndUpdate(req.user._id, {
    refreshToken: null,
    forceLogoutReason: "MANUAL",
  });
  return resp.clearCookie("refreshToken", cookieOptions).sendStatus(200);
};

export { signUpUser, loginUser, generateToken, logOut, me, refreshAccessToken };
