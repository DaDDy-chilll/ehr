import { EHR_API } from "@/app/utils/ehr_api";
import { ehrPayload } from "./ehr.type";

class EhrService {
    private EHR_API: string = EHR_API.EHR;
    constructor() {
    }

    async createEHR(payload: ehrPayload) {
        try {
            const response = await fetch(this.EHR_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
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

    async getEHR(id: string) {
        try {
            const response = await fetch(`${this.EHR_API}/${id}`);
            const data = await response.json();
            console.log('data', data);
            console.log('response', response);
            
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
                    error: data.message 
                };
            }
        } catch (error) {
            console.log('error', error);
            return {
                status: 500,
                ok: false,
                error: error
            };
        }
    }
}

export default EhrService;
