import { NextResponse } from 'next/server';
import { getImageStatus } from '@/app/utils/extraction';
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

    const result = await getImageStatus(test?.image);

    const updateTest = await prisma.test.update({
      where: {
        id
      },
      data: {
        image: result,
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
