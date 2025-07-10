import EhrService from "./ehr.service";
import { NextRequest, NextResponse } from "next/server";

export const createEHR = async (request: NextRequest) => {
    const ehrService = new EhrService();
    const payload = await request.json();
    const result = await ehrService.createEHR(payload);
    return NextResponse.json(result, {
      status: result.status,
    });
}

export const getEHR = async (ehrId: string) => {
    const ehrService = new EhrService();
    const result = await ehrService.getEHR(ehrId);
    return NextResponse.json(result, {
      status: result.status,
    });
}