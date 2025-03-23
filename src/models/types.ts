export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  reviews: Review[];
}

export interface Review {
  id?: string; // Optional for new reviews
  user: string;
  comment: string;
  createdAt?: Date; // Optional if returned from DB
}
