import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔄 Seeding database...");

  // מחיקת נתונים קיימים אם הם קיימים
  try {
    await prisma.review.deleteMany();
    await prisma.product.deleteMany();
  } catch (error) {
    console.warn(
      "⚠️ Warning: Could not delete existing data. It may not exist yet."
    );
  }

  // יצירת מוצרים עם תמונות אמיתיות
  const products = await prisma.product.createMany({
    data: [
      {
        name: "MacBook Pro 16",
        description: "Powerful laptop with M3 chip",
        price: 2499.99,
        imageUrl:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      },
      {
        name: "Sony WH-1000XM5",
        description: "Top-notch noise-canceling headphones",
        price: 349.99,
        imageUrl:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      },
      {
        name: "iPhone 14 Pro",
        description: "Apple's latest smartphone with Pro features",
        price: 1099.99,
        imageUrl:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      },
      {
        name: "Samsung Galaxy S23 Ultra",
        description: "Flagship Android phone with a 200MP camera",
        price: 1199.99,
        imageUrl:
          "https://images.unsplash.com/photo-1601972602009-97df62cdb01a",
      },
      {
        name: "Dell XPS 15",
        description: "Premium Windows laptop with stunning display",
        price: 1799.99,
        imageUrl:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      },
      {
        name: "Nintendo Switch OLED",
        description: "Popular gaming console with an OLED display",
        price: 349.99,
        imageUrl:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      },
    ],
  });

  console.log("✅ Products i  nserted successfully!");

  const laptop = await prisma.product.findFirst({
    where: { name: "MacBook Pro 16" },
  });
  if (laptop) {
    await prisma.review.create({
      data: {
        author: "John Doe",
        text: "Amazing performance and battery life!",
        productId: laptop.id,
      },
    });
    console.log("✅ Reviews inserted successfully!");
  }
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
