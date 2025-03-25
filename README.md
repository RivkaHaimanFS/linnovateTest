```bash
Product Catalog & Reviews Application

Overview

This is a Next.js-based product catalog application that allows users to browse products and submit reviews. The project focuses on building a robust frontend with API integration and database storage.

Features

List products on the homepage

View detailed product information and reviews

Submit new reviews for products

Modular and reusable UI components

API for fetching and submitting data

Database integration with Prisma

Tech Stack

Frontend: Next.js, React, TypeScript

Styling: TailwindCSS

State Management: Context API

Backend: Next.js API Routes

Database: MongoDB (via Prisma ORM)

Testing: Jest, React Testing Library

## Project Structure


my-next-app/
├── prisma/          # Database schema and seeding
├── public/          # Static assets
├── src/
│   ├── app/         # Next.js App Router
│   │   ├── api/     # API routes
│   │   ├── product/ # Product pages
│   ├── components/  # UI components
│   ├── context/     # Context providers
│   ├── models/      # Type definitions
│   ├── styles/      # Global styles
├── .env             # Environment variables
├── package.json     # Project dependencies
├── tsconfig.json    # TypeScript config


Setup & Installation

1️⃣ Clone the Repository

git clone <repository-url>
cd linnovateTest

2️⃣ Install Dependencies

npm install

3️⃣ Set Up Database

npx prisma generate
npx prisma db push
npm run seed

4️⃣ Run the Application

npm run dev

API Endpoints

GET /api/products → Fetch all products

GET /api/products/:id → Fetch product details

POST /api/products/:id/review → Add a review

Testing

Run tests using:

npm test

Deployment

To deploy the application, use:

npm run build
npm start

Notes

Ensure the .env file is properly configured for database connection.(see .env.example)

Adjust styles and API configurations as needed.

Happy coding! 🚀
```
