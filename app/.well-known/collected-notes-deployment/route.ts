import { NextResponse } from 'next/server';

export async function GET() {
  const SITE_PATH = process.env.SITE_PATH || 'unknown';
  const DEPLOYMENT_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL || 'unknown';
  const TEMPLATE_VERSION = '1.0';

  return NextResponse.json({
    site_path: SITE_PATH,
    template_version: TEMPLATE_VERSION,
    deployment_url: DEPLOYMENT_URL,
  });
}
