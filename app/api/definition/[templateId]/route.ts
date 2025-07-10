import { getDefinition } from "../definition.controller";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { templateId: string } }
) {
  // The templateId is available in params.templateId
  return await getDefinition(params.templateId);
}
