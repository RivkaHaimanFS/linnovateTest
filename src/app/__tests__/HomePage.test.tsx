import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "../page";

describe("HomePage", () => {
  it("renders no products message when product list is empty", async () => {
    render(<HomePage />);

    expect(
      await screen.findByText("No products available")
    ).toBeInTheDocument();
  });
});
