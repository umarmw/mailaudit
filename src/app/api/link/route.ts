import { NextResponse } from 'next/server';
import { getLinkStatus } from '@/app/utils/extraction';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const test = await prisma.test.findUnique({
      where: {
        id
      }
    });

    const result = await getLinkStatus(test);

    const updateTest = await prisma.test.update({
      where: {
        id
      },
      data: {
        link: result,
      },
    })

    return NextResponse.json({"message":"Data updated successfully", "data": updateTest});

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process the URL" },
      { status: 500 }
    );
  }
}
