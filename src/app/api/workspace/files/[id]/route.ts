import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const workspace = await prisma.workspace.findUnique({
            where: {
                id: params.id,
            },
            select: {
                fileData: true,
            },
        });

        return NextResponse.json({ success: true, files: workspace?.fileData });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch workspace files" });
    }
}