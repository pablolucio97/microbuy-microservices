"use client";
import { formatBRL } from "@/utils/format";

interface CartItemProps {
  id: string;
  title: string;
  description: string;
  price: number;
  onRemoveProduct: (productId: string) => void;
}

export default function CartItem({
  id,
  title,
  description,
  price,
  onRemoveProduct,
}: CartItemProps) {
  return (
    <div
      className="w-full flex flex-col p-4 rounded-md mb-3 mr-3 bg-gradient-to-r from-gray-700 to-gray-800"
      key={id}
    >
      <strong className="text-white text-xs lg:text-[14px] font-bold">
        {title}
      </strong>
      <div className="w-full flex justify-between items-center">
        <span className="text-white text-xs lg:text-[14px] my-2">
          {description}
        </span>
        <button
          className="h-8 flex flex-col justify-center items-center p-2 font-bold rounded-md bg-red-400 text-textWhite ml-3"
          onClick={() => onRemoveProduct(id)}
        >
          Remove
        </button>
      </div>
      <span className="text-white text-xs lg:text-[14px] font-bold">
        {formatBRL(price)}
      </span>
    </div>
  );
}
