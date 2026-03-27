import { NextRequest } from "next/server";
import { updateField } from "@/components/VisualEditingClient/UpdateColection";

export async function POST(request: NextRequest) {
  return updateField(request);
}

