import jwt from "jsonwebtoken";

export const requireToken = (request, response, next) => {
  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    return response.status(401).json({ message: "Token Required" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    request.user = user;
    next();
  } catch (err) {
    response.status(401).json({ message: "Invalid or expired token" });
  }
};