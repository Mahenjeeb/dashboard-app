import jwt from "jsonwebtoken";
const baseConfig = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};
const expiryConfigRefresh = { ...baseConfig, maxAge: 7 * 24 * 60 * 60 * 1000 };
const expiryConfigAccess = { ...baseConfig, maxAge: 30 * 30 * 1000 };
const generateToken = (user) => {
  const accessToken = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );
  const newRefreshToken = jwt.sign(
    { _id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );
  return { accessToken, newRefreshToken };
};

export { generateToken, baseConfig, expiryConfigRefresh, expiryConfigAccess };
