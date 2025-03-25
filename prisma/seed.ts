const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

async function main() {
  console.log("🔄 Seeding database...");

  try {
    await prisma.review.deleteMany();
    await prisma.product.deleteMany();
    console.log("✅ Existing data deleted.");
  } catch (error) {
    console.warn(
      "⚠️ Warning: Could not delete existing data. It may not exist yet."
    );
  }

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
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
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

  console.log("✅ Products inserted successfully!");

  const laptop = await prisma.product.findFirst({
    where: { name: "MacBook Pro 16" },
  });

  const phone = await prisma.product.findFirst({
    where: { name: "iPhone 14 Pro" },
  });

  if (laptop && phone) {
    await prisma.review.createMany({
      data: [
        {
          author: "John Doe",
          text: "Amazing performance and battery life!",
          productId: laptop.id,
        },
        {
          author: "Jane Smith",
          text: "A great phone, but quite expensive.",
          productId: phone.id,
        },
      ],
    });

    console.log("✅ Reviews inserted successfully!");
  } else {
    console.warn("⚠️ Some products not found for reviews.");
  }
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
