import { NextResponse } from 'next/server';
import { defaultSettings } from '@/data/defaults';

export async function GET() {
  try {
    // In a real app, you would check database connections, etc.
    const status = 'OK';
    
    // Check if we're using the default settings or custom values
    // In a real app, this would be more sophisticated
    const usingDefaultValues = true;
    
    return NextResponse.json({
      status,
      timestamp: new Date().toISOString(),
      api: {
        version: 'v1',
        endpoints: ['/api/v1/defaults', '/api/v1/health']
      },
      config: {
        usingDefaultValues,
        settingsCount: Object.keys(defaultSettings).length
      }
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { 
        status: 'ERROR',
        error: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 