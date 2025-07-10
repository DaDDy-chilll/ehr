import { EHR_API } from "@/app/utils/ehr_api";

export class CompositionService {
 
    private compositionApi: string;
    constructor(ehrId: string) {
        this.compositionApi = EHR_API.Composition(ehrId);
    }

    async createComposition(payload: string) {
        try {
            const response = await fetch(this.compositionApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: payload,
            });
            console.log('response', response.body);
            
            // Extract ETag from headers instead of parsing JSON
            const etag = response.headers.get('etag');
            const location = response.headers.get('location');
            if(response.ok){
                return {
                    status: response.status,
                    ok: response.ok,
                    etag: etag ? etag.replace(/\"/g, '') : null, // Remove quotes from etag
                    location,
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

    async getComposition(id: string) {
        try {
            const response = await fetch(`${this.compositionApi}/${id}`);
            const data = await response.json();
            
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

    async updateComposition(id: string, payload: string) {}

    async deleteComposition(id: string) {}
}   

