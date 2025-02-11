import { chatSession } from "@/lib/AiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { prompt } = await req.json();

    try {
        const result = await chatSession.sendMessage(prompt);
        const AIResp = result.response.text();

        return NextResponse.json({ result: AIResp });
    } catch (e) {
        return NextResponse.json({ error: e });
    }
}