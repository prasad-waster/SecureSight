import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    const incidentId = Number(params.id);

    if (!incidentId || isNaN(incidentId)) {
      return NextResponse.json(
        { error: "Invalid incident ID" },
        { status: 400 }
      );
    }

    const incident = await prisma.incident.update({
      where: { id: incidentId },
      data: { resolved: true },
      include: { camera: true },
    });

    return NextResponse.json(incident, { status: 200 });
  } catch (error: any) {
    // Prisma error for record not found
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Incident not found" },
        { status: 404 }
      );
    }
    console.error("Error resolving incident:", error);
    return NextResponse.json(
      { error: "Failed to resolve incident" },
      { status: 500 }
    );
  }
}
