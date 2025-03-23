"use client";

import { useDispatch } from "react-redux";
import { useState } from "react";
import ProductDetails from "@/components/ProductDetails";
import ReviewsList from "@/components/ReviewsList";
import ReviewForm from "@/components/ReviewForm";
import { getProductById } from "@/utils/api";
import { Product, Review } from "@/models/types";
import { addReview } from "@/store/products.slice";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product: Product = await getProductById(params.id);
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState<Review[]>(product.reviews || []);

  if (!product) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  const handleReviewSubmit = async (review: Omit<Review, "id">) => {
    const newReview = {
      ...review,
      productId: product.id,
      createdAt: new Date(),
    };

    // עדכון Redux
    dispatch(addReview({ productId: product.id, review: newReview }));

    // עדכון הסטייט המקומי כדי למנוע השהייה
    setReviews((prev) => [...prev, newReview]);

    // שליחה לשרת
    await fetch(`/api/products/${product.id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ProductDetails {...product} />
      <ReviewsList reviews={reviews} />
      <ReviewForm onReviewSubmit={handleReviewSubmit} />
    </div>
  );
}
