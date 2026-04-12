import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'AHCT Ranchi API is running',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
  });
}
