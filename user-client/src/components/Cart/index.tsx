"use client";
import { IProduct } from "@/interfaces/products";
import CartItem from "./CartItem";

interface CartProps {
  products: IProduct[];
  onRemoveProduct: () => void;
  onFinishOrder: () => void;
  onCloseCart: () => void;
  showCart: boolean;
  finishOrderButtonDisabled: boolean;
}

export default function Cart({
  onFinishOrder,
  products,
  onRemoveProduct,
  onCloseCart,
  showCart,
  finishOrderButtonDisabled,
}: CartProps) {
  return (
    <aside
      className={
        showCart
          ? "w-full md:min-w-[24rem] h-screen bg-gradient-to-b from-gray-700 to-gray-900 p-4 relative overflow-hidden"
          : "hidden"
      }
    >
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl text-white">Your cart</h2>
        <button
          className="p-1 rounded-md flex items-center justify-center bg-red-400 ml-4 md:hidden text-white text-sm lg:text-[14px]"
          onClick={onCloseCart}
        >
          Close
        </button>
      </div>
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
          className="w-full h-12 flex flex-col justify-center items-center p-4 font-bold rounded-md bg-primaryLight text-textWhite text-sm lg:text-[14px] disabled:opacity-50"
          onClick={onFinishOrder}
          disabled={finishOrderButtonDisabled}
        >
           Finish order
        </button>
      </div>
    </aside>
  );
}
