import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, context: any) {
  // For safety, check if params exist
  const id = context?.params?.id;

  const incidentId = Number(id);

  if (!incidentId || Number.isNaN(incidentId)) {
    return NextResponse.json({ error: "Invalid incident ID" }, { status: 400 });
  }

  try {
    const incident = await prisma.incident.update({
      where: { id: incidentId },
      data: { resolved: true },
      include: { camera: true },
    });

    return NextResponse.json(incident, { status: 200 });
  } catch (error: any) {
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
    return NextResponse.json(
      { error: "Failed to resolve incident" },
      { status: 500 }
    );
  }
}
