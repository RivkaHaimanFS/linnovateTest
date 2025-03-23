import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ProductDetails from "@/components/ProductDetails";
import ReviewsList from "@/components/ReviewsList";
import ReviewForm from "@/components/ReviewForm";
import { api } from "@/utils/api";
import { RootState } from "@/store/store";
import { setProducts, addReview } from "@/store/products.slice";
import { Product, Review } from "@/models/types";

const ProductPage = ({ product }: { product: Product }) => {
  console.log("current product", product);
  const dispatch = useDispatch();
  const router = useRouter();
  const products = useSelector((state: RootState) => state.products.products);
  const existingProduct = products.find((p) => p.id === product.id);

  useEffect(() => {
    if (!existingProduct) {
      dispatch(setProducts([...products, product]));
    }
  }, [dispatch, product, existingProduct, products]);

  if (router.isFallback) return <p>Loading...</p>;
  if (!product)
    return <p className="text-center text-red-500">Product not found</p>;

  const handleReviewSubmit = async (review: Review) => {
    dispatch(addReview({ productId: product.id, review }));

    await fetch(`/api/products/${product.id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ProductDetails {...product} />
      <ReviewsList reviews={existingProduct?.reviews || product.reviews} />
      <ReviewForm onReviewSubmit={handleReviewSubmit} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  try {
    const product = await api.getProductById(id);
    if (!product) return { notFound: true };
    return {
      props: {
        product: { ...product, reviews: product.reviews || [] },
      },
    };
  } catch (error) {
    return { props: { product: null } };
  }
};

export default ProductPage;
