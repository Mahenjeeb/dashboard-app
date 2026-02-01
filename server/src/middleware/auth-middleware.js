import userModel from "../models/user_model.js";
import jwt from "jsonwebtoken";
const authenticate = async (req, resp, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) return resp.status(401).json("invalid token");
    const user = await userModel.findById(decoded._id);
    if (!user) return resp.status(401).json("invalid user");
    req.user = user;
    next();
  } catch (error) {
    return resp.status(401).json(error.message);
  }
};

export default authenticate;
