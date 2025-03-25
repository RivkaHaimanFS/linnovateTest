import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "@/app/page";
import { getProducts } from "@/api";
import { Product } from "@/models/types";
import "@testing-library/jest-dom";

jest.mock("@/api", () => ({
  getProducts: jest.fn(),
}));

describe("HomePage", () => {
  it("renders products when API call is successful", async () => {
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Product 1",
        price: 100,
        description: "Desc 1",
        imageUrl: "",
      },
      {
        id: "2",
        name: "Product 2",
        price: 200,
        description: "Desc 2",
        imageUrl: "",
      },
    ];
    (getProducts as jest.Mock).mockResolvedValue(mockProducts);

    render(await HomePage());

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });

  it("renders message when no products are available", async () => {
    (getProducts as jest.Mock).mockResolvedValue([]);

    render(await HomePage());

    await waitFor(() => {
      expect(screen.getByText("No products available")).toBeInTheDocument();
    });
  });
});
