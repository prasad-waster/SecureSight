import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const resolvedParam = req.nextUrl.searchParams.get('resolved')
    const resolved = resolvedParam === null ? undefined : resolvedParam === 'true'

    const whereClause = typeof resolved === 'boolean' ? { resolved } : {}

    const incidents = await prisma.incident.findMany({
      where: whereClause,
      orderBy: { tsStart: 'desc' },
      include: { 
        camera: true 
      },
    })

    return NextResponse.json(incidents)
  } catch (error) {
    console.error('Error fetching incidents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch incidents' },
      { status: 500 }
    )
  }
}
