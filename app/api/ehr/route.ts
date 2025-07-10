import { NextRequest } from "next/server";
import { createEHR } from "./ehr.controller";

export async function POST(request: NextRequest) {
    return await createEHR(request);
}

