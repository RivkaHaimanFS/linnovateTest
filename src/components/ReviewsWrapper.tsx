"use client";

import { ReviewsProvider } from "@/context/ReviewsContext";
import ReviewForm from "@/components/ReviewForm";
import ReviewsList from "@/components/ReviewsList";
import { Review } from "@/models/types";

interface ReviewsWrapperProps {
  productId: string;
  initialReviews: Review[];
}

export default function ReviewsWrapper({
  productId,
  initialReviews,
}: ReviewsWrapperProps) {
  return (
    <ReviewsProvider initialReviews={initialReviews}>
      <ReviewsList />
      <ReviewForm productId={productId} />
    </ReviewsProvider>
  );
}
