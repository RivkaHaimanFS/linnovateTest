const API_BASE_URL = "/api/products"; // Adjust base URL if needed

export const api = {
  // Fetch all products
  async getProducts() {
    console.log("get productsss");
    const res = await fetch(`${API_BASE_URL}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  // Fetch a single product by ID
  async getProductById(id: string) {
    console.log("idddd", id);
    const res = await fetch(`http://localhost:3000/api/products/1`);
    if (!res.ok) throw new Error("Failed to f etch product");
    console.log("res", res);
    return res.json();
  },
  // Add a review to a product
  async addReview(
    productId: string,
    review: { author: string; text: string; rating: number }
  ) {
    console.log("Adding review...", review);
    const res = await fetch(`${API_BASE_URL}/${productId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });

    if (!res.ok) throw new Error("Failed to add review");
    return res.json();
  },
};
