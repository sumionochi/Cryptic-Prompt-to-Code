import prisma from "@/lib/db";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { name, email, picture, sub } = body;
    if (!name || !email || !sub) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    console.log('Processing auth request for:', { name, email, sub });
    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { uid: sub }
    });

    console.log(user);

    if (!user) {
      // Create new user if doesn't exist
      user = await prisma.user.create({
        data: {
          name,
          email,
          picture,
          uid: sub
        }
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in auth API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}