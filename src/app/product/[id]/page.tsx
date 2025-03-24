import ProductDetails from "@/components/ProductDetails";
import ReviewsWrapper from "@/components/ReviewsWrapper";
import { Product } from "@/models/types";
import { getProductById } from "@/api";

export default async function ProductPage({
  params,
}: {
  params?: { id?: string };
}) {
  if (!params?.id) {
    return <p className="text-center text-red-500">Invalid product ID</p>;
  }

  let product: Product | null = null;

  try {
    // Fetch product data from server
    product = await getProductById(params.id);
  } catch (error) {
    console.error("Error fetching product:", error);
    return <p className="text-center text-red-500">Failed to load product</p>;
  }

  if (!product) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ProductDetails {...product} />
      <ReviewsWrapper
        productId={product.id}
        initialReviews={product.reviews || []}
      />
    </div>
  );
}
