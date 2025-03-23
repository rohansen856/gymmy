import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log(params)
    // Get equipment by ID from the database
    const equipment = await prisma.equipment.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!equipment) {
      return NextResponse.json(
        { error: "Equipment not found" },
        { status: 404 }
      )
    }

    // Get all bookings for this equipment
    const bookings = await prisma.booking.findMany({
      where: {
        equipment: {
          id: params.id,
        },
      },
      orderBy: {
        startTime: "asc",
      },
    })

    return NextResponse.json({
      equipment,
      bookings,
    })
  } catch (error) {
    console.error("Error fetching equipment:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  } finally {
    // Disconnect Prisma client to prevent connection leaks
    await prisma.$disconnect()
  }
}

// Handle PUT request to update equipment
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    // Check if equipment exists before updating
    const existingEquipment = await prisma.equipment.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingEquipment) {
      return NextResponse.json(
        { error: "Equipment not found" },
        { status: 404 }
      )
    }

    // Validate that we're not changing the equipment to a status that conflicts with active bookings
    if (body.status === "maintenance" || body.status === "out-of-order") {
      // Check if there are any confirmed or pending bookings
      const activeBookings = await prisma.booking.findMany({
        where: {
          equipmentId: params.id,
          status: { in: ["confirmed", "pending"] },
          endTime: { gt: new Date() }, // Only consider bookings that haven't ended yet
        },
      })

      if (activeBookings.length > 0) {
        return NextResponse.json(
          {
            error:
              "Cannot change equipment status. There are active bookings for this equipment.",
            conflictingBookings: activeBookings,
          },
          { status: 409 }
        )
      }
    }

    // Update the equipment
    const equipment = await prisma.equipment.update({
      where: {
        id: params.id,
      },
      data: body,
    })

    return NextResponse.json({
      success: true,
      equipment,
    })
  } catch (error) {
    console.error("Error updating equipment:", error)

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      if (error.code === "P2025") {
        // Handle specific Prisma errors
        return NextResponse.json(
          { error: "Equipment not found" },
          { status: 404 }
        )
      }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// Handle DELETE request to remove equipment
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // First, delete all bookings for this equipment
    await prisma.booking.deleteMany({
      where: {
        equipmentId: params.id,
      },
    })

    // Then, delete the equipment
    await prisma.equipment.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting equipment:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
