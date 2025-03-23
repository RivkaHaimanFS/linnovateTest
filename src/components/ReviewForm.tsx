import { Review } from "@/models/types";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Textarea from "./Textarea";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addReview } from "@/store/products.slice";

interface ReviewFormProps {
  onReviewSubmit: (review: Review) => void;
}

const ReviewForm = ({ onReviewSubmit }: ReviewFormProps) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Review>({
    defaultValues: {
      user: "",
      comment: "",
      rating: undefined,
    },
  });

  const onSubmit = (data: Review) => {
    onReviewSubmit(data);
    reset();
  };

  console.log({ errors });

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-3">Leave a Review</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-white p-4 rounded-lg shadow"
      >
        <Input
          label="Name"
          type="text"
          placeholder="Your Name"
          error={errors.user?.message}
          {...register("user", { required: "Name is required" })}
        />

        <Textarea
          label="Your Review"
          placeholder="Write your review here..."
          {...register("comment", { required: "Review cannot be empty" })}
          error={errors.comment?.message}
        />
        <Input
          label="Rating (1-5)"
          type="number"
          min="1"
          max="5"
          {...register("rating", {
            valueAsNumber: true,
            required: "Rating is required",
            min: { value: 1, message: "Rating must be at least 1" },
            max: { value: 5, message: "Rating must be at most 5" },
          })}
          error={errors.rating?.message}
        />
        <Button type="submit" variant="secondary">
          Submit Review
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
