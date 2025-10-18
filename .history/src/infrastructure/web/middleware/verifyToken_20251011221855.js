import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET || "andrei";

  try {
    const decoded = jwt.verify(token, secret); // ✅ decoded only exists here
    console.log("Decoded JWT:", decoded);

    req.admin = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
