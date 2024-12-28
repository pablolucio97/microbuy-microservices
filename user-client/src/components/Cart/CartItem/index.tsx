"use client";
import { formatBRL } from "@/utils/format";

interface CartItemProps {
  id: string;
  title: string;
  description: string;
  price: number;
  onRemoveItem: () => void;
}

export default function CartItem({
  id,
  title,
  description,
  price,
  onRemoveItem,
}: CartItemProps) {
  return (
    <div
      className="w-full flex flex-col p-4 rounded-md mb-3 mr-3 bg-textWhite"
      key={id}
    >
      <strong>{title}</strong>
      <div className="w-full flex justify-between items-center">
        <span>{description}</span>
        <button
          className="h-8 flex flex-col justify-center items-center p-2 font-bold rounded-md bg-red-400 text-textWhite"
          onClick={onRemoveItem}
        >
          Remove
        </button>
      </div>
      <span>{formatBRL(price)}</span>
    </div>
  );
}
