import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { workspaceId, messages } = await req.json();

        const updatedWorkspace = await prisma.workspace.update({
            where: {
                id: workspaceId,
            },
            data: {
                message: messages,
            },
        });

        return NextResponse.json({ success: true, workspace: updatedWorkspace });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to update workspace" });
    }
}