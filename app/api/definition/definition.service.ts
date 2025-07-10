import { EHR_API } from "@/app/utils/ehr_api";

class DefinitionService {
    private DEFINITION_API: string = EHR_API.Definition;
    constructor() {
    }

    async createDefinition(payload: string | File) {
       try {
        // If payload is a File object (from client-side), handle it accordingly
        const fileData = typeof payload === 'string' ? payload : await this.getFileContent(payload);
        
        // Log the request details for debugging
        console.log('Request URL:', this.DEFINITION_API);
        console.log('Request headers:', { "Content-Type": "application/xml" });
        console.log('Request payload length:', fileData.length);
        
        // Debug: Log the first 100 characters of the payload to see what we're dealing with
        console.log('Payload preview:', fileData.substring(0, 100));
        
        // Check if the payload is JSON instead of XML
        if (fileData.trim().startsWith('{') || fileData.trim().startsWith('[')) {
            console.log('Detected JSON payload, but XML is required');
            // For now, just continue with the request to see the actual error from the server
        }
        
        const response = await fetch(this.DEFINITION_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/xml",
            },
            body: fileData,
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries([...response.headers.entries()]));
        
        // Extract ETag from headers instead of parsing JSON
        const etag = response.headers.get('etag');
        const location = response.headers.get('location');
        if(response.ok){
            return {
                status: response.status,
                ok: response.ok,
                etag: etag ? etag.replace(/\"/g, '') : null, // Remove quotes from etag
                location,
                statusText: response.statusText
            };
        }else if(response.status === 409){
            return {
                status: response.status,
                ok: response.ok,
                error: "Template (or) Definition already exists"
            };
        }else{
            // For 400 errors, try to get more detailed error information
            let errorDetail = response.statusText;
            try {
                // Try to parse response body for more details
                const errorText = await response.text();
                console.log('Error response body:', errorText);
                errorDetail = errorText || response.statusText;
            } catch (e) {
                console.log('Could not parse error response:', e);
            }
            
            return {
                status: response.status,
                ok: response.ok,
                error: errorDetail
            };
        }
       } catch (error) {
        console.log('error', error);
        return {
            status: 500,
            ok: false,
            error: error?.toString()
        };
       }
    }

    async getAllDefinition() {
        try {
            const response = await fetch(this.DEFINITION_API);
            const data = await response.json();
            console.log('data', data);
            
            if(response.ok){
                return {
                    status: response.status,
                    ok: response.ok,
                    data: data
                };
            }else{
                return {
                    status: response.status,
                    ok: response.ok,
                    error: response.statusText 
                };
            }
        } catch (error) {
            console.log('error', error);
            return {
                status: 500,
                ok: false,
                error: error?.toString()
            };
        }
    }

    async getDefinition(id:string) {
        try {
            const response = await fetch(`${this.DEFINITION_API}/${id}`);
            const data = await response.text();
            
            if(response.ok){
                return {
                    status: response.status,
                    ok: response.ok,
                    data: data
                };
            }else{
                return {
                    status: response.status,
                    ok: response.ok,
                    error: response.statusText 
                };
            }
        } catch (error) {
            console.log('error', error);
            return {
                status: 500,
                ok: false,
                error: error?.toString()
            };
        }
    }
    
    // Helper method to get content from File objects (for client-side usage)
    private async getFileContent(file: File): Promise<string> {
        // This will only be used in client components, not in API routes
        if (typeof window === 'undefined') {
            throw new Error('File objects can only be processed in browser environment');
        }
        
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(reader.error);
            reader.readAsText(file);
        });
    }
}

export default DefinitionService;