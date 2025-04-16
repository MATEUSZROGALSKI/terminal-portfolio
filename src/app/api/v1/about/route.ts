import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const aboutCollection = db.collection('about');

    // Fetch all about entries
    const aboutEntries = await aboutCollection
      .find({})
      .toArray();

    return NextResponse.json({ items: aboutEntries }, { status: 200 });
  } catch (error) {
    console.error('Error fetching about data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about data' },
      { status: 500 }
    );
  }
}