import { Review } from "@/models/types";

type ReviewsListProps = {
  reviews: Review[];
};

const ReviewsList = ({ reviews }: ReviewsListProps) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-3">Customer Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg mb-2">
            <p className="font-semibold">{review.user}</p>
            <p className="text-gray-600">{review.comment}</p>
            <p className="text-yellow-500">⭐ {review.rating}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
};

export default ReviewsList;
