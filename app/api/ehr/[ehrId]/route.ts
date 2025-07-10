import { getEHR } from "../ehr.controller";
import { NextRequest } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { ehrId: string } }
) {
  return await getEHR(params.ehrId);
}
