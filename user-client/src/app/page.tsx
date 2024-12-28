"use client";
import Cart from "@/components/Cart";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/mock";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex flex-col overflow-x-hidden">
      <main className="w-full flex pl-[4rem]">
        <div className="w-full px-8">
          <h1 className="text-textHeading text-2xl ml-3 font-bold mt-4">
            MicroBuy
          </h1>
          <span className="text-textHeading text-md ml-3 ">
            Select the products to emit your order
          </span>
          <div className="w-full max-h-[90vh] p-3 overflow-y-auto overflow-x-hidden">
            {products.map((prod) => (
              <ProductCard
                key={prod.id}
                id={prod.id}
                title={prod.name}
                description={prod.description}
                price={prod.price}
                onRemoveItem={() => console.log("Item removed")}
              />
            ))}
          </div>
        </div>
        <Cart />
      </main>
    </div>
  );
}
