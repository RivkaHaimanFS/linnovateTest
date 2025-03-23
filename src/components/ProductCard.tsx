import Image from "next/image";
import { Product } from "@/models/types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={200}
        height={200}
        className="mx-auto"
      />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>
      <p className="text-yellow-500">⭐ {product.rating.toFixed(1)}</p>
    </div>
  );
};
