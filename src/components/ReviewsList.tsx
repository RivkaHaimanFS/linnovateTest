import { useReviews } from "@/context/ReviewsContext";

export default function ReviewsList() {
  const { reviews } = useReviews();

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-3">Customer Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg mb-2">
            <p className="font-semibold">{review.author}</p>
            <p className="text-gray-600">{review.text}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
}
