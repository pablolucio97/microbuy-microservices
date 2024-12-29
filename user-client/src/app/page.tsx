"use client";
import Cart from "@/components/Cart";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/mock";
import { IProduct } from "@/interfaces/products";
import { useEffect, useState } from "react";

export default function Home() {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const [showMobileCart, setShowMobileCart] = useState(false);

  const MEDIUM_DEVICE_BREAKPOINT = 768;

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

  const handleShowCart = () => {
    setShowMobileCart(!showMobileCart);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MEDIUM_DEVICE_BREAKPOINT) {
        setShowMobileCart(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col overflow-x-hidden">
      <main className="w-full flex md:pl-[4rem]">
        <div className={showMobileCart ? "hidden" : "w-full md:px-8"}>
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

        {showMobileCart ? (
          <Cart
            products={cartProducts}
            onFinishOrder={() => console.log("Order finished")}
            onRemoveProduct={handleRemoveProduct as never}
            onCloseCart={handleShowCart}
            showCart={showMobileCart}
          />
        ) : (
          <button
            className="h-8 flex flex-col justify-center items-center p-4 py-6 font-bold text-lg rounded-md bg-primaryLight text-textWhite md:hidden absolute top-4 right-8"
            onClick={handleShowCart}
          >
            Show cart
          </button>
        )}

        <div className="hidden md:block  bg-red-300">
          <Cart
            products={cartProducts}
            onFinishOrder={() => console.log("Order finished")}
            onRemoveProduct={handleRemoveProduct as never}
            onCloseCart={handleShowCart}
            showCart={!showMobileCart}
          />
        </div>
      </main>
    </div>
  );
}
