import { NextResponse } from 'next/server';
import { extract } from '@/app/utils/extraction';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to fetch the HTML content of a URL
async function fetchHTML(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch URL: ${url}`);
  }
  return res.text();
}


export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    // Fetch the HTML content of the page
    const html = await fetchHTML(url);

    const result = await extract(html);
    const link = result[0] || [];
    const image = result[1] || [];
    const metadata = result[2] || [];

    const newTest = await prisma.test.create({
      data: {
        url,
        link,
        image,
        metadata
      },
    });
    return NextResponse.json({"message": "Data saved successfully", "data": newTest});

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process the URL" },
      { status: 500 }
    );
  }
}
