import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { productId, author, text } = await req.json();

    // Validate the input
    if (!productId || !author || !text) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Add the review to the database
    const newReview = await prisma.review.create({
      data: {
        productId,
        author,
        text,
      },
    });
    // Return the newReview wrapped in a NextResponse
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json(
      { error: "Failed to add review" },
      { status: 500 }
    );
  }
}
