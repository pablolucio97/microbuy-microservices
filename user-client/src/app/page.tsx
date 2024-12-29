"use client";
import Cart from "@/components/Cart";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/mock";
import { IProduct } from "@/interfaces/products";
import { useState } from "react";

export default function Home() {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);

  const handleRemoveProduct = (productId: string) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter((prod) => prod.id !== productId)
    );
  };

  const handleAddProduct = (product: IProduct) => {
    setCartProducts((prevProducts) => {
      const isProductInCartAlready = prevProducts.some(
        (prod) => prod.id === product.id
      );
      if (!isProductInCartAlready) {
        return [...prevProducts, product];
      }
      return prevProducts;
    });
  };

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
                name={prod.name}
                description={prod.description}
                price={prod.price}
                onAddToCart={() => handleAddProduct(prod)}
              />
            ))}
          </div>
        </div>
        <Cart
          products={cartProducts}
          onFinishOrder={() => console.log("Order finished")}
          onRemoveProduct={handleRemoveProduct as never}
        />
      </main>
    </div>
  );
}
