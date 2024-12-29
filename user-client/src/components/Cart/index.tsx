"use client";
import { IProduct } from "@/interfaces/products";
import CartItem from "./CartItem";

interface CartProps {
  products: IProduct[];
  onRemoveProduct: () => void;
  onFinishOrder: () => void;
}

export default function Cart({
  onFinishOrder,
  products,
  onRemoveProduct,
}: CartProps) {
  return (
    <aside className="w-full md:min-w-[24rem] md:w-2/3 lg:w-1/3 h-screen bg-white p-4 relative overflow-hidden">
      <h2 className="font-bold text-xl mb-4">Your cart</h2>
      <div className="w-full max-h-[85%] p-3 overflow-y-auto overflow-x-hidden">
        {products.map((prod) => (
          <CartItem
            key={prod.id}
            id={prod.id}
            title={prod.name}
            description={prod.description}
            price={prod.price}
            onRemoveProduct={onRemoveProduct}
          />
        ))}
      </div>
      <div className="w-full flex items-center justify-center absolute bottom-0 right-0 p-8">
        <button
          className="w-full h-12 flex flex-col justify-center items-center p-4 font-bold rounded-md bg-primary text-textWhite"
          onClick={onFinishOrder}
        >
          Finish order
        </button>
      </div>
    </aside>
  );
}
