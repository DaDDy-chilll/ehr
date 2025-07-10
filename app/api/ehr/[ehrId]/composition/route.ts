import { NextRequest, NextResponse } from "next/server";
import { postComposition } from "../../../composition";
export const dynamic = 'force-dynamic'; 
export async function POST(
    request: NextRequest,
    { params }: { params: { ehrId: string } }
) {
    // Use params directly without assigning to variables
    const payload = await request.text();
    const result = await postComposition(params.ehrId, payload);
   
    return NextResponse.json(result, {
        status: 200,
    });
}

