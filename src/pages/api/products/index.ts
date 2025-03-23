import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    id: "1",
    name: "Laptop",
    description: "A high-performance laptop",
    price: 1200,
    imageUrl: "/images/laptop.png",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Smartphone",
    description: "A powerful smartphone",
    price: 800,
    imageUrl: "/images/smartphone.png",
    rating: 4.3,
  },
  {
    id: "3",
    name: "Headphones",
    description: "Noise-canceling headphones",
    price: 200,
    imageUrl: "/images/headphones.png",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Laptop",
    description: "A high-performance laptop",
    price: 1200,
    imageUrl: "/images/laptop.png",
    rating: 4.5,
  },
  {
    id: "5",
    name: "Smartphone",
    description: "A powerful smartphone",
    price: 800,
    imageUrl: "/images/smartphone.png",
    rating: 4.3,
  },
  {
    id: "6",
    name: "Headphones",
    description: "Noise-canceling headphones",
    price: 200,
    imageUrl: "/images/headphones.png",
    rating: 4.7,
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    console.log("uuuuu");
    try {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
