import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductPage from "@/app/product/[id]/page";
import { getProductById } from "@/api";
import { ReviewsProvider } from "@/context/ReviewsContext";

jest.mock("@/api", () => ({
  getProductById: jest.fn(),
}));

describe("ProductPage", () => {
  it("renders product details when product is found", async () => {
    const mockProduct = {
      id: "1",
      name: "Test Product",
      price: 100,
      description: "Test product description",
      reviews: [],
    };
    (getProductById as jest.Mock).mockResolvedValue(mockProduct);

    render(await ProductPage({ params: { id: "1" } }));

    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
      expect(screen.getByText("Test product description")).toBeInTheDocument();
    });
  });

  it("renders error message when product not found", async () => {
    (getProductById as jest.Mock).mockResolvedValue(null);

    render(await ProductPage({ params: { id: "1" } }));

    await waitFor(() => {
      expect(screen.getByText("Product not found")).toBeInTheDocument();
    });
  });

  it("renders the review form", async () => {
    const mockProduct = {
      id: "1",
      name: "Test Product",
      price: 100,
      description: "Test product description",
      reviews: [],
    };
    (getProductById as jest.Mock).mockResolvedValue(mockProduct);

    render(await ProductPage({ params: { id: "1" } }));
    expect(screen.getByTestId("author-input")).toBeInTheDocument();
    expect(screen.getByTestId("review-input")).toBeInTheDocument();
    expect(screen.getByText("Submit Review")).toBeInTheDocument();
  });
});
