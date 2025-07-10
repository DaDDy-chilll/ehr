import { NextRequest, NextResponse } from "next/server";
import { CompositionService } from "./composition.service";

export async function GET(request: NextRequest) {
    try {
        // Get query parameters
        const ehrId = request.nextUrl.searchParams.get('ehrId');
        const compositionId = request.nextUrl.searchParams.get('compositionId');
        
        // Validate required parameters
        if (!ehrId || !compositionId) {
            return NextResponse.json(
                { ok: false, error: 'Missing required parameters: ehrId and compositionId' },
                { status: 400 }
            );
        }
        
        // Create composition service instance
        const compositionService = new CompositionService(ehrId);
        
        // Get composition details
        const result = await compositionService.getComposition(compositionId);
        
        // Return the result
        return NextResponse.json(result, {
            status: result.status || 200,
        });
    } catch (error) {
        console.error('Error getting composition:', error);
        return NextResponse.json(
            { ok: false, error: 'Failed to get composition: ' + (error instanceof Error ? error.message : String(error)) },
            { status: 500 }
        );
    }
}