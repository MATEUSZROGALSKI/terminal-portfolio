import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const timelineCollection = db.collection('timeline');
    
    // Fetch all timeline entries and sort by startDate in descending order
    const timelineEntries = await timelineCollection
      .find({})
      .sort({ startDate: -1 })
      .toArray();
    
    return NextResponse.json({ items: timelineEntries }, { status: 200 });
  } catch (error) {
    console.error('Error fetching timeline data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch timeline data' },
      { status: 500 }
    );
  }
} 