import { prisma } from "@/lib/prisma";
import { Product, Review } from "@/models/types";
import { fetcher } from "./fetcher";

export async function getProducts(): Promise<Product[]> {
  try {
    return await prisma.product.findMany();
  } catch (error) {
    console.error("Error fetching product:", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    const reviews = await prisma.review.findMany({
      where: { productId: id },
    });

    return { ...product, reviews } as Product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function addProductReview(productId: string, review: Review) {
  try {
    const createdReview = await fetcher(`/api/products/${productId}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        ...review,
      }),
    });

    return createdReview;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
}
