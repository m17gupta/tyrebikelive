import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // Disable draft mode
  const draft = await draftMode();
  draft.disable();

  return NextResponse.json({
    message: "Draft mode disabled",
    isEnabled: false,
  });
}

