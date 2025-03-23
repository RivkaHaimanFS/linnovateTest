import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import HomePage from "@/app/page"; // Adjust the import path as necessary
import { getProducts } from "@/utils/api";

// Mock the getProducts function
jest.mock("@/utils/api", () => ({
  getProducts: jest.fn(),
}));

describe("HomePage", () => {
  it("renders a message when no products are available", async () => {
    // Mock the getProducts function to return an empty array
    (getProducts as jest.Mock).mockResolvedValueOnce([]);

    render(<HomePage />);

    expect(
      await screen.findByText("No products available")
    ).toBeInTheDocument();
  });

  it("renders a list of products", async () => {
    // Mock the getProducts function to return a list of products
    const mockProducts = [
      { id: "1", name: "Product 1", price: 100 },
      { id: "2", name: "Product 2", price: 150 },
    ];
    (getProducts as jest.Mock).mockResolvedValueOnce(mockProducts);

    render(<HomePage />);

    expect(await screen.findByText("Product 1")).toBeInTheDocument();
    expect(await screen.findByText("Product 2")).toBeInTheDocument();
  });
});
