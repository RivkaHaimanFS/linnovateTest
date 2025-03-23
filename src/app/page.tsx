"use client";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/utils/api";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Product Catalog</h1>
      {products.length === 0 ? (
        <p className="text-center mt-10">No products available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <a key={product.id} href={`/product/${product.id}`}>
              <ProductCard product={product} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
