// app/[id]/page.tsx
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const prisma = new PrismaClient();

// Fetch data for the record with the given ID
export async function generateMetadata({ params }: { params: { id: string } }) {
  const testRecord = await prisma.test.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!testRecord) {
    return notFound(); // Handle 404 if no record is found
  }

  return {
    title: `Record ${testRecord.id} - ${testRecord.url}`,
  };
}

export default async function TestPage({ params }: { params: { id: string } }) {
  const testRecord = await prisma.test.findUnique({
    where: {
      id: Number(params.id), // Convert the string id to a number
    },
  });

  if (!testRecord) {
    return notFound(); // Handle 404 if no record is found
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Record ID: {testRecord.id}</h1>
      <p><strong>URL:</strong> {testRecord.url}</p>
      <p><strong>Created At:</strong> {new Date(testRecord.createdAt).toLocaleString()}</p>

      <div className="mt-4">
        <h3 className="font-semibold">Links:</h3>
        <ul className="list-disc ml-5">
          {testRecord?.link?.map((link: any, index: number) => (
            <li key={index}>
              <a href={link.href} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                {link.text}
              </a> - Status: {link.status}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Images:</h3>
        <ul className="list-disc ml-5">
          {testRecord?.image?.map((img: any, index: number) => (
            <li key={index}>
              <a href={img.src} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                {img.alt}
              </a> - Status: {img.status}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Metadata:</h3>
        <p><strong>Title:</strong> {testRecord?.metadata?.title}</p>
        <p><strong>Description:</strong> {testRecord?.metadata?.description}</p>
      </div>

      <div className="mt-4">
        <Link href="/" className="text-blue-500 underline">Back to Home</Link>
      </div>
    </div>
  );
}
