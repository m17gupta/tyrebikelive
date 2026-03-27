import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "kalp-zero-default-secret-change-in-production",
);

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  tenantKey: string;
  subscriptionLevel: string;
  agencyId?: string;
}

/**
 * Signs a JWT with the given payload.
 * Expires in 7 days by default.
 */
export async function signToken(payload: JwtPayload): Promise<string> {
  return new SignJWT(payload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

/**
 * Verifies a JWT and returns the decoded payload.
 * Returns null if the token is invalid or expired.
 */
export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JwtPayload;
  } catch (err) {
    // In production, we might want to log specific error types (expired, invalid signature, etc.)
    // without leaking sensitive details to the client.
    return null;
  }
}
