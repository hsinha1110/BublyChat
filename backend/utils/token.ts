import jwt from "jsonwebtoken";
import { UserProps } from "../types";

export const generateToken = (user: UserProps): string => {
  const payload = {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};
