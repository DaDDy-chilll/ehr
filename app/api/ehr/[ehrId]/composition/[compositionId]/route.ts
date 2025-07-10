import { NextRequest } from "next/server";
import { getComposition } from "@/app/api/composition";
export const dynamic = 'force-dynamic'; 
export async function GET(
    request: NextRequest,
    { params }: { params: { ehrId: string,compositionId: string } }
) {
    const ehrId =  params.ehrId;
    const compositionId =  params.compositionId;
    console.log('ehrId',ehrId,'compositionId',compositionId)
    return await getComposition(ehrId,compositionId);
}

