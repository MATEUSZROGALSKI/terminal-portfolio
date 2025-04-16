import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const projectsCollection = db.collection('projects');
    
    // Fetch all projects
    const projects = await projectsCollection
      .find({})
      .toArray();
    
    return NextResponse.json({ items: projects }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects data' },
      { status: 500 }
    );
  }
} 