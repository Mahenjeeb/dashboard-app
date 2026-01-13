import userModel from "../models/user_model.js";
import jwt from "jsonwebtoken";
const verifyToken = async (req, resp, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) return resp.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await userModel.findOne({ _id: decoded._id });
    if (!user) {
      return resp.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return resp.status(500).json({ message: error?.message });
  }
};

export default verifyToken;
