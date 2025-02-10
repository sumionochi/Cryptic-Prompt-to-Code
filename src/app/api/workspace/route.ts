import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const { input, userId } = await req.json();
    console.log(input, userId)

    if (!input || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify user exists before creating workspace
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    console.log(user);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create a new workspace
    const workspaces = await prisma.workspace.create({
        data: {
          message: input,
          uid: uuidv4(),
          userId: user.id,
        },
    });

    console.log(workspaces);

    return NextResponse.json(workspaces);
  } catch (error) {
    console.error('Error creating workspace:', error);
    return NextResponse.json(
      { error: 'Failed to create workspace' },
      { status: 500 }
    );
  }
}