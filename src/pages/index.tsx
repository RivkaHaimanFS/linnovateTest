import { useEffect } from "react";
import Link from "next/link";
import { Product } from "@/models/types";
import { ProductCard } from "@/components/ProductCard";
import { api } from "@/utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/store/products.slice";
import { RootState } from "@/store/store";

export default function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const loading = products.length === 0;

  useEffect(() => {
    if (products.length === 0) {
      api
        .getProducts()
        .then((data) => dispatch(setProducts(data)))
        .catch(console.error);
    }
  }, [dispatch, products.length]);

  console.log("pppp", products);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Product Catalog</h1>
      {products.length === 0 && (
        <p className="text-center mt-10">No products available</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
