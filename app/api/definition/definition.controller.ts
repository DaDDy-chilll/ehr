import DefinitionService from "./definition.service";
import { NextResponse, NextRequest } from "next/server";

/**
 * Extract XML content from a multipart form data request
 */
async function extractXmlFromFormData(request: NextRequest): Promise<string | null> {
  try {
    const clonedRequest = request.clone();
    const formData = await clonedRequest.formData();
    
    // Try common field names for file uploads
    const fieldNames = ['file', 'xml', 'xmlFile', 'template', 'definition'];
    
    // First check for files in the expected fields
    for (const name of fieldNames) {
      const field = formData.get(name);
      if (field instanceof File) {
        console.log(`Found file in field '${name}':`, field.name);
        const content = await field.text();
        if (content.trim().startsWith('<?xml') || content.trim().startsWith('<')) {
          return content;
        }
      } else if (typeof field === 'string' && 
                (field.trim().startsWith('<?xml') || field.trim().startsWith('<'))) {
        return field;
      }
    }
    
    // If not found, check all fields
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string' && 
          (value.trim().startsWith('<?xml') || value.trim().startsWith('<'))) {
        console.log(`Found XML in unexpected field '${key}'`);
        return value;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting XML from form data:', error);
    return null;
  }
}

/**
 * Create a new definition by uploading XML template
 */
export const createDefinition = async (request: NextRequest) => {
  try {
    const definitionService = new DefinitionService();
    const contentType = request.headers.get('content-type') || '';
    let xmlContent: string;
    
    if (contentType.includes('multipart/form-data')) {
      console.log('Processing multipart form data request');
      const extractedXml = await extractXmlFromFormData(request);
      
      if (extractedXml) {
        xmlContent = extractedXml;
        console.log('Successfully extracted XML from form data');
      } else {
        // Fall back to raw body if XML not found in form data
        xmlContent = await request.text();
        console.log('Using raw request body as fallback');
      }
    } else {
      // For direct XML uploads
      xmlContent = await request.text();
      console.log('Processing direct XML upload');
    }
    
    console.log('XML content length:', xmlContent.length);
    console.log('XML content preview:', xmlContent.substring(0, 50));
    
    const result = await definitionService.createDefinition(xmlContent);
    return NextResponse.json(result, { status: result.status });
    
  } catch (error: unknown) {
    console.error('Error in createDefinition:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({
      status: 500,
      ok: false,
      error: errorMessage
    }, { status: 500 });
  }
};

/**
 * Get all definitions
 */
export const getAllDefinition = async () => {
  const definitionService = new DefinitionService();
  const result = await definitionService.getAllDefinition();
  return NextResponse.json(result, { status: result.status });
};

/**
 * Get a specific definition by ID
 */
export const getDefinition = async (templateId: string) => {
  const definitionService = new DefinitionService();
  const result = await definitionService.getDefinition(templateId);
  return NextResponse.json(result, { status: result.status });
};
