import { prisma } from "@/lib/prisma";

export async function getProducts() {
  return await prisma.product.findMany();
}

export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      reviews: true,
    },
  });
}
