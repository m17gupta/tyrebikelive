import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * POST /api/admin/auth/logout
 * Clears the administrative session cookie.
 */
export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("kalp_admin_session");

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("[AdminLogout] Error clearing session:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
