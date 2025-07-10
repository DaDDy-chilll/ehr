import { createDefinition, getAllDefinition } from "./definition.controller";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    return await createDefinition(request);
}

export async function GET() {
    return await getAllDefinition();
}
