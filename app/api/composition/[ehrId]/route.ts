import { NextRequest, NextResponse } from "next/server";
import { CompositionService } from "../composition.service";

export async function POST(
  request: NextRequest,
  context: { params: { ehrId: string } }
) {
  try {
    // Get the ehrId from context.params (properly awaited by Next.js)
    const { ehrId } = context.params;
    
    // Create the composition service with the ehrId
    const compositionService = new CompositionService(ehrId);
    
    // Parse the JSON payload
    const payload = await request.json();
    
    // Convert payload back to string for the service
    const payloadString = JSON.stringify(payload);
    
    // Call the service to create the composition
    const result = await compositionService.createComposition(payloadString);

    
    // Handle 204 No Content responses or other responses without a body
    if (result === null || result === undefined || (result.status === 204)) {
      return NextResponse.json({ ok: result.ok, data: {etag: result.etag,location: result.location} }, { status: 200 });
    }
    
    // Return the result for other status codes
    return NextResponse.json(result, {
      status: result.status || 200,
    });
  } catch (error) {
    console.error('Error creating composition:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to create composition: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}
