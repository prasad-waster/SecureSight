import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const incidentId = Number(params.id)

    if (isNaN(incidentId)) {
      return NextResponse.json(
        { error: 'Invalid incident ID' },
        { status: 400 }
      )
    }

    const incident = await prisma.incident.update({
      where: { id: incidentId },
      data: { resolved: true },
      include: { 
        camera: true 
      },
    })

    return NextResponse.json(incident)
  } catch (error) {
    console.error('Error resolving incident:', error)
    return NextResponse.json(
      { error: 'Failed to resolve incident' },
      { status: 500 }
    )
  }
}
