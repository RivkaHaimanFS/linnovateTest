import { Review } from "@/models/types";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Textarea from "./Textarea";
import Button from "./Button";

interface ReviewFormProps {
  onReviewSubmit: (review: Omit<Review, "id">) => void;
}

const ReviewForm = ({ onReviewSubmit }: ReviewFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Review, "id">>({
    defaultValues: {
      author: "",
      text: "",
      rating: 5,
    },
  });

  const onSubmit = (data: Omit<Review, "id">) => {
    onReviewSubmit(data);
    reset();
  };

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
          error={errors.author?.message}
          {...register("author", { required: "Name is required" })}
        />

        <Textarea
          label="Your Review"
          placeholder="Write your review here..."
          {...register("text", { required: "Review cannot be empty" })}
          error={errors.text?.message}
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
  