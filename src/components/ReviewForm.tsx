import { useReviews } from "@/context/ReviewsContext";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Textarea from "./Textarea";
import Button from "./Button";

interface ReviewFormProps {
  productId: string;
}

export default function ReviewForm({ productId }: ReviewFormProps) {
  const { addReview } = useReviews();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ author: string; text: string }>({
    defaultValues: { author: "", text: "" },
  });

  const onSubmit = async (data: { author: string; text: string }) => {
    await addReview(productId, data);
    reset();
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-3">Leave a Review</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 rounded-lg shadow"
      >
        <Input
          data-testid="author-input"
          id="author"
          label="Name"
          {...register("author", { required: "Name is required" })}
          error={errors.author?.message}
        />
        <Textarea
          data-testid="review-input"
          id="text"
          label="Your Review"
          {...register("text", { required: "Review cannot be empty" })}
          error={errors.text?.message}
        />
        <Button type="submit" variant="secondary">
          Submit Review
        </Button>
      </form>
    </div>
  );
}
