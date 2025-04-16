import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const techProfileCollection = db.collection('tech_profile');
    
    // Fetch all tech profile entries
    const techProfileEntries = await techProfileCollection
      .find({})
      .toArray();
    
    return NextResponse.json({ items: techProfileEntries }, { status: 200 });
  } catch (error) {
    console.error('Error fetching tech profile data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tech profile data' },
      { status: 500 }
    );
  }
}
