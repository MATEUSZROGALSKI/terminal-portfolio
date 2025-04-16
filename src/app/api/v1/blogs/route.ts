import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const blogsCollection = db.collection('blogs');
    
    // Fetch all blog posts and sort by createdAt in descending order
    const blogPosts = await blogsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json({ items: blogPosts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
} 