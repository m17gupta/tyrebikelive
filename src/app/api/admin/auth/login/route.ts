import { NextRequest, NextResponse } from "next/server";
import { getMasterDb } from "@/lib/db";
import { cookies } from "next/headers";
import { signToken } from "@/lib/jwt";

/**
 * POST /api/admin/auth/login
 * Handles administrative authentication and issues a JWT session cookie.
 */
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const db = await getMasterDb();

    // Find user by email in masterDb (case-insensitive)
    const admin = await db.collection("users").findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    console.log(`[AdminLogin] Attempt for ${email}. Found in DB:`, admin ? "Yes" : "No");

    // Authentication Logic:
    // 1. Check against DB password if user exists
    // 2. Mock Support: 'admin' or '11111111' for rapid development/prototyping
    const isDbMatch = admin && admin.password === password;
    const isMockMatch = password === "admin" || password === "11111111";

    if (!isDbMatch && !isMockMatch) {
      console.log(`[AdminLogin] Authentication FAILED for ${email}`);
      return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 });
    }

    console.log(`[AdminLogin] Authentication SUCCESS for ${email}`);

    // Prepare session payload
    const userPayload = {
      userId: admin?._id?.toString() || "mock_id",
      email: admin?.email || email,
      role: admin?.role || "tenant_admin",
      name: admin?.name || "Admin User",
      tenantKey: admin?.tenantKey || "demo", // Fallback for mock users
      subscriptionLevel: admin?.subscriptionLevel || "starter",
    };

    // Sign JWT
    const token = await signToken(userPayload);

    // Set secure HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set("kalp_admin_session", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.json({
      authenticated: true,
      user: userPayload,
    });
  } catch (error) {
    console.error("[AdminLogin] API Error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
