import Image from "next/image";

interface ProductDetailsProps {
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  rating: number;
}

const ProductDetails = ({
  name,
  imageUrl,
  description,
  price,
  rating,
}: ProductDetailsProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{name}</h1>
      <Image
        src={imageUrl}
        alt={name}
        width={400}
        height={300}
        className="rounded-lg"
      />
      <p className="text-gray-700 my-4">{description}</p>
      <p className="text-lg font-semibold text-blue-600">Price: ${price}</p>
      <p className="text-lg">⭐ {rating} / 5</p>
    </div>
  );
};

export default ProductDetails;
