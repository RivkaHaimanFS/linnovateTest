// import { render, screen, fireEvent } from "@testing-library/react";
// import { createContext, useContext } from "react";
// import ProductPage from "./page";
// import { getProductById } from "@/api";

// jest.mock("@/api");

// const mockProduct = {
//   id: "1",
//   name: "Test Product",
//   description: "Test Description",
//   price: 100,
//   imageUrl: "http://example.com/image.jpg",
//   reviews: [],
// };

// const mockReview = {
//   id: "1",
//   productId: "1",
//   author: "Test Author",
//   text: "This is a test review.",
// };

// getProductById.mockResolvedValue(mockProduct);

// const ReviewsContext = createContext();

// const renderWithProviders = (ui, { contextValue } = {}) => {
//   return render(
//     <ReviewsContext.Provider value={contextValue}>{ui}</ReviewsContext.Provider>
//   );
// };

// describe("ProductPage", () => {
//   let contextValue: any;

//   beforeEach(() => {
//     contextValue = {
//       reviews: [],
//       addReview: jest.fn(),
//     };
//   });

//   it("should add a review", async () => {
//     renderWithProviders(<ProductPage params={{ id: "1" }} />, { contextValue });

//     // Simulate adding a review
//     fireEvent.change(screen.getByLabelText(/author/i), {
//       target: { value: mockReview.author },
//     });
//     fireEvent.change(screen.getByLabelText(/text/i), {
//       target: { value: mockReview.text },
//     });
//     fireEvent.click(screen.getByText(/submit/i));

//     // Check if addReview function was called
//     expect(contextValue.addReview).toHaveBeenCalledWith(mockReview);
//   });
// });
