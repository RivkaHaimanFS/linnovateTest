import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// ✅ תמיכה בבקשות GET
export async function GET() {
  console.log("11111");
  try {
    const products = await prisma.product.findMany();
    console.log("products", products);
    return NextResponse.json(products);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// ✅ תמיכה בבקשות POST (אם נדרש)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newProduct = await prisma.product.create({
      data: body,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
