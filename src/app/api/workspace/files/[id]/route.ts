import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id : string }> } 
) {
    const { id } = await params; 
    try {
        const workspace = await prisma.workspace.findUnique({
            where: {
                id: id,
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