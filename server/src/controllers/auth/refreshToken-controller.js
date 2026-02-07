import jwt from "jsonwebtoken";
import userModel from "../../models/user_model.js";
import {
  generateToken,
  expiryConfigRefresh,
  expiryConfigAccess,
} from "../../utils/auth-service.js";
const refreshAccessToken = async (req, resp) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return resp.sendStatus(403);
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!decoded) return resp.sendStatus(403);
    const user = await userModel.findById({ _id: decoded._id });
    if (!user) return resp.sendStatus(403);
    const { accessToken, newRefreshToken } = generateToken(user);
    user.refreshToken = user.refreshToken
      .filter((rt) => rt !== refreshToken)
      .concat(newRefreshToken);
    await user.save();
    return resp
      .cookie("refreshToken", newRefreshToken, expiryConfigRefresh)
      .cookie("accessToken", accessToken, expiryConfigAccess)
      .status(200)
      .json({ message: "Token Refreshed" });
  } catch (error) {
    return resp.status(500).json(error.message);
  }
};

export default refreshAccessToken;
