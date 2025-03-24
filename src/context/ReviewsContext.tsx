"use client";

import { createContext, useContext, useState } from "react";
import { Review } from "@/models/types";
import { addProductReview } from "@/api";

interface ReviewsContextType {
  reviews: Review[];
  addReview: (productId: string, review: Review) => Promise<void>;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export function ReviewsProvider({
  children,
  initialReviews,
}: {
  children: React.ReactNode;
  initialReviews: Review[];
}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const addReview = async (productId: string, reviewData: Review) => {
    try {
      const newReview = await addProductReview(productId, reviewData);
      setReviews((prevReviews) => [...prevReviews, newReview]);
    } catch (error) {
      console.error("Failed to add review:", error);
    }
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewsContext.Provider>
  );
}

// Custom hook for accessing reviews
export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewsProvider");
  }
  return context;
}
