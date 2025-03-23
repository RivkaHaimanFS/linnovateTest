import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  if (req.method === "POST") {
    const { author, text, rating } = req.body;

    if (!author || !text || typeof rating !== "number") {
      return res.status(400).json({ error: "Missing or invalid review data" });
    }

    try {
      // Find the product
      const product = await prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Create the review
      const newReview = await prisma.review.create({
        data: {
          author,
          text,
          rating,
          productId: id, // Assuming there's a relation between Review and Product
        },
      });

      // Fetch updated product with reviews
      const updatedProduct = await prisma.product.findUnique({
        where: { id },
        include: { reviews: true }, // Ensure reviews are included in the response
      });

      return res
        .status(201)
        .json({ message: "Review added", product: updatedProduct });
    } catch (error) {
      console.error("Error adding review:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
