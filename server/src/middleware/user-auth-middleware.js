import userModel from "../models/user_model.js";
import jwt from "jsonwebtoken";
const verifyToken = async (req, resp, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return resp.status(401).json({ message: "Unauthorized" });
    const accessToken = header.split(" ")[1];
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) return resp.status(401).json({ message: "Unauthorized" });
    const user = await userModel.findById(decoded._id);
    if (!user) return resp.status(401).json({ message: "Unauthorized" });
    req.user = user;
    next();
  } catch (error) {
    return resp.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyToken;
