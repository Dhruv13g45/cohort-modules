import jwt, { JwtPayload } from "jsonwebtoken"

export interface userPayload extends JwtPayload {
    id: string,
    email: string,
}

export const generateToken = (payload: userPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7h",
  });
};

export const verifyToken = (token: string): userPayload => {
  const payload = jwt.verify(token, process.env.JWT_SECRET!);

  if (typeof payload === "string") {
    throw new Error("Invalid JWT payload");
  }

  return payload as userPayload;
};