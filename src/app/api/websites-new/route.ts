export async function POST(req: NextRequest) {
  const corsOrigin = await getCorsOrigin(req);
  const payload = await getPayload({ config: configPromise });
  let data;
  try {
    data = req.json()

    console.log("data--------", data)
  } catch (err) {
    console.log("err--->",err)
    return new NextResponse(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
    });
  }
  try {
    const created = await payload.create({
      collection: 'websites' as any,
      data,
    });
    const res = new NextResponse(JSON.stringify(created), {
      status: 201,
    });
    res.headers.set('Access-Control-Allow-Origin', corsOrigin);
    res.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  } catch (err) {
    console.log(" post error---", err)
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import configPromise from '@payload-config';

async function getAllowedOrigins(): Promise<string[]> {
  const payload = await getPayload({ config: configPromise });
  const { docs: websites } = await payload.find({
    collection: 'websites' as any,
    limit: 0,
    pagination: false,
    select: { domains: true },
  });
  // Flatten all domains from all websites
  const allowed: string[] = websites.flatMap((site: any) =>
    Array.isArray(site.domains) ? site.domains.map((d: any) => d.domain) : []
  );

  return allowed;
}

function getOriginFromRequest(req: NextRequest) {
  return req.headers.get('origin') || req.headers.get('referer') || '';
}

async function getCorsOrigin(req: NextRequest) {
  const origin = getOriginFromRequest(req);
  
  
  
  const allowedOrigins = await getAllowedOrigins();
  // Normalize origin for localhost (strip protocol)
  let normalizedOrigin = origin.replace(/^https?:\/\//, '');
  // Check for exact match or protocol-less match
  if (allowedOrigins.some(domain => domain === normalizedOrigin || origin.includes(domain))) {
    return origin;
  }
  return '';
}

export async function GET(req: NextRequest) {
  const corsOrigin = await getCorsOrigin(req);
   const res = new NextResponse(JSON.stringify({
    message: 'Websites API works!',
    corsOrigin,
  }), {
    status: 200,
  });
  console.log("res",res)
  res.headers.set('Access-Control-Allow-Origin', corsOrigin);
  res.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  res.headers.set('Access-Control-Allow-Credentials', 'true');
  return res;
}

export async function OPTIONS(req: NextRequest) {
  const corsOrigin = await getCorsOrigin(req);
  const res = new NextResponse(null, {
    status: 204,
  });
  res.headers.set('Access-Control-Allow-Origin', corsOrigin);
  res.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  res.headers.set('Access-Control-Allow-Credentials', 'true');
  return res;
}

