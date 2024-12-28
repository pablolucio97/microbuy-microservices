"use client";
import { formatBRL } from "@/utils/format";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  onRemoveItem: () => void;
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  onRemoveItem,
}: ProductCardProps) {
  return (
    <div
      className="w-full flex flex-col p-4 rounded-md mb-3 mr-3 bg-textWhite"
      key={id}
    >
      <strong>{title}</strong>
      <div className="w-full flex justify-between items-center">
        <span>{description}</span>
        <button
          className="h-8 flex flex-col justify-center items-center p-4 py-6 font-bold text-lg rounded-md bg-primaryLight text-textWhite"
          onClick={onRemoveItem}
        >
          Add to cart
        </button>
      </div>
      <span>{formatBRL(price)}</span>
    </div>
  );
}
