import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { userId: string } } 
) {
    try {
        const { userId } = params;  
        console.log("Received userId in API route:", userId);

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        const workspaces = await prisma.workspace.findMany({
            where: { userId },
            select: {
                id: true,
                message: true,
                fileData: true,
                uid: true,
                createdAt: true,
                updatedAt: true
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });

        return NextResponse.json(
            { workspaces },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching workspaces:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
