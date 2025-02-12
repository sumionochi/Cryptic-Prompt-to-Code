import { New_AiCode } from "@/lib/AiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { prompt } = await req.json();

    try {
        const result = await New_AiCode.sendMessage(prompt);
        const ai_response = result.response.text();
        return NextResponse.json({result:ai_response});
    } catch(e) {
        return NextResponse.json({error: e});
    }
}