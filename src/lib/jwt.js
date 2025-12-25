import * as jose from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.VITE_JWT_SECRET_KEY);

const generateToken = async (payload, expirationTime = "10min") => {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(SECRET_KEY);
};

const verifyToken = async (token) => {
  return await jose.jwtVerify(token, SECRET_KEY);
};

export { generateToken, verifyToken };
