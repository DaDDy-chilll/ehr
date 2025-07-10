import {  NextResponse } from "next/server";
import {CompositionService} from "./composition.service";

export const getComposition = async (ehrId: string,compositionId: string) => {
    const compositionService = new CompositionService(ehrId);
    const result = await compositionService.getComposition(compositionId);
    console.log('result-----',result)
    return NextResponse.json(result, {
      status: result.status,
    });
}

export const postComposition = async (ehrId: string,payload: string) => {
    const compositionService = new CompositionService(ehrId);
    return await compositionService.createComposition(payload);
}