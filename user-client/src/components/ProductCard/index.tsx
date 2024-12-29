"use client";
import { IProduct } from "@/interfaces/products";
import { formatBRL } from "@/utils/format";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  onAddToCart: (prod: IProduct) => void;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div
      className="w-full flex flex-col p-4 rounded-md mb-3 mr-3 bg-gradient-to-r from-gray-700 to-gray-800"
      key={id}
    >
      <strong className="text-white text-xs lg:text-[14px] font-bold">
        {name}
      </strong>
      <div className="w-full flex justify-between items-center">
        <span className="text-white text-xs lg:text-[14px]">{description}</span>
        <button
          className="h-8 flex flex-col justify-center items-center p-4 py-6 font-bold rounded-md bg-gradient-to-r from-primary to-primaryLight text-textWhite text-sm lg:text-[14px]"
          onClick={() => onAddToCart({ id, name, description, price })}
        >
          Add to cart
        </button>
      </div>
      <span className="text-white text-xs lg:text-[14px]">
        {formatBRL(price)}
      </span>
    </div>
  );
}
