import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

/**
 * GET /api/admin/auth/me
 * Verifies the current session and returns the user profile.
 */
export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("kalp_admin_session")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: payload,
    });
  } catch (error) {
    console.error("[AdminMe] Verification failed:", error);
    return NextResponse.json(
      { authenticated: false, error: "Session verification failed" },
      { status: 500 },
    );
  }
}
