import userModel from "../../models/user_model.js";
import bcrypt from "bcrypt";
import {
  baseConfig,
  expiryConfigRefresh,
  expiryConfigAccess,
  generateToken,
} from "../../utils/auth-service.js";
import Workspace from "../../models/workspace_model.js";

const signup = async (req, resp) => {
  const { name, email, password } = req.body;
  if (!email) {
    return resp.status(400).json({ message: "Email is required" });
  }
  if (!name) {
    return resp.status(400).json({ message: "Name is required" });
  }
  try {
    // Check for existing email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return resp.status(400).json({ message: "Account Already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const signUpUserObj = {
      name,
      email,
      password: hashedPassword,
      role: 'super admin',
    };
    const workspace_name = name.split(" ")[0];
    const createdUser = await userModel.create(signUpUserObj);
    const workspaceObj = {
      workspace_name,
      workspace_desc: `${workspace_name}'s workspace`,
      ownerId: createdUser._id,
    };
    const createdWorkspace = await Workspace.create(workspaceObj);
    createdUser.workspace = createdWorkspace._id;
    await createdUser.save();
    return resp.status(201).json({ message: "Account created" });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "something went wrong" });
  }
};

const login = async (req, resp) => {
  const refreshToken = req.cookies?.refreshToken;
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user)
    return resp.status(401).json({ message: "Invalid email or password." });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return resp.status(401).json({ message: "Invalid email or password." });
  const { accessToken, newRefreshToken } = generateToken(user);
  if (refreshToken) {
    user.refreshToken = user.refreshToken.filter((rt) => rt !== refreshToken);
    resp.clearCookie("refreshToken", baseConfig);
  }
  user.refreshToken = [...user.refreshToken.slice(-4), newRefreshToken];
  await user.save();
  return resp
    .cookie("refreshToken", newRefreshToken, expiryConfigRefresh)
    .cookie("accessToken", accessToken, expiryConfigAccess)
    .status(200)
    .json({ message: "Login Sucessfull" });
};

const me = async (req, resp) => {
  const { _id } = req.user;
  const user = await userModel
    .findById({ _id })
    .select("-password")
    .select("-refreshToken");
  return resp.status(200).json({ user });
};

const logout = async (req, resp) => {
  try {
    const { _id } = req.user;
    const user = await userModel.findById({ _id });
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      user.refreshToken = user.refreshToken.filter((rt) => rt !== refreshToken);
      resp.clearCookie("refreshToken", baseConfig);
      resp.clearCookie("accessToken", baseConfig);
      return resp.status(200).json({ message: "Successfully Logged out" });
    } else {
      return resp.status(500).json({ message: "Internal Server Error" });
    }
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};

export { signup, login, logout, me };
