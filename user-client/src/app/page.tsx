"use client";
import Cart from "@/components/Cart";
import EmailModal from "@/components/EmailModal";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useEmail } from "@/contexts/EmailContext";
import {
  useCreateOrderMutation,
  useListProductsQuery,
} from "@/graphql/graphql";
import { IProduct } from "@/interfaces/products";
import { CouponsRepository } from "@/repositories/couponsRepostory/CouponsRepository";
import { validateEmail } from "@/utils/validators";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IoMdMenu } from "react-icons/io";

export default function Home() {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const MEDIUM_DEVICE_BREAKPOINT = 768;

  const router = useRouter();
  const { email, setEmail } = useEmail();

  const couponsRepository = useMemo(() => {
    return new CouponsRepository();
  }, []);

  const {
    data: productsListData,
    loading: productsListLoading,
    error: productsListError,
  } = useListProductsQuery();

  const totalCartProducts = useMemo(() => {
    const total = cartProducts.reduce((acc, val) => acc + val.price, 0);
    return total;
  }, [cartProducts]);

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

  const handleToggleEmailModal = useCallback(() => {
    setShowEmailModal(!showEmailModal);
  }, [showEmailModal]);

  const navigateToOrders = useCallback(() => {
    router.push("/orders");
  }, [router]);

  const createCoupon = useCallback(async () => {
    try {
      setLoading(true);
      const coupon = await couponsRepository.createCoupon({
        total: totalCartProducts,
      });
      console.log(coupon);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleToggleEmailModal();
    }
  }, [couponsRepository, handleToggleEmailModal, totalCartProducts]);

  const [
    createOrder,
    { loading: createOrderLoading, error: createOrderError },
  ] = useCreateOrderMutation();

  const handleCreateOrder = useCallback(async () => {
    try {
      const productsIds = cartProducts.map((prod) => prod.id);
      createOrder({
        variables: {
          productIds: productsIds,
        },
      });
    } catch {
      console.log(createOrderError);
    }
  }, [cartProducts, createOrder, createOrderError]);

  useEffect(() => {
    const MIN_EMAIL_LENGTH = 5;
    if (email.length > MIN_EMAIL_LENGTH) {
      setIsEmailValid(validateEmail(email));
    }
  }, [email]);

  const handleFinishOrder = useCallback(async () => {
    try {
      await createCoupon();
      await handleCreateOrder();
      navigateToOrders();
    } catch (error) {
      console.log(error);
    }
  }, [createCoupon, handleCreateOrder, navigateToOrders]);

  return (
    <div className="w-screen min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-r from-gray-800 to-gray-900">
      <Header />
      <main className="w-full flex lg:pl-[2rem] pt-[4rem]">
        <div className={showMobileCart ? "hidden" : "w-full md:px-8 pt-4"}>
          <span className="text-textHeading  text-sm md:text-lg  text-white ml-4 md:ml-0">
            Select the products to emit your order
          </span>
          <div className="w-full max-h-[80vh] overflow-y-auto overflow-x-hidden scrollable-div mt-4 px-4 md:px-0">
            {loading || productsListLoading ? (
              <span className="text-textHeading  text-sm md:text-xl ml-3 text-white mt-2 mb-3">
                Loading...
              </span>
            ) : productsListError ? (
              <span className="text-textHeading  text-sm md:text-xl ml-3 text-white mt-2 mb-3">
                Something went wrong. Please, try again later.
              </span>
            ) : (
              productsListData &&
              productsListData.listProducts &&
              productsListData.listProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  id={prod.id}
                  name={prod.name}
                  description={prod.description}
                  price={prod.price}
                  onAddToCart={() => handleAddProduct(prod)}
                />
              ))
            )}
          </div>
        </div>

        {showMobileCart ? (
          <Cart
            products={cartProducts}
            onFinishOrder={handleToggleEmailModal}
            onRemoveProduct={handleRemoveProduct as never}
            onCloseCart={handleShowCart}
            showCart={showMobileCart}
            finishOrderButtonDisabled={cartProducts.length < 1}
            totalProducts={totalCartProducts}
          />
        ) : (
          <button
            className="h-8 flex justify-center items-center p-4 py-6 font-bold rounded-md bg-none text-textWhite md:hidden absolute top-3 right-3 text-sm lg:text-[14px] z-[3]"
            onClick={handleShowCart}
          >
            <IoMdMenu className="w-5 h-5 text-white mr-3" />
            Cart
          </button>
        )}

        <div className="hidden md:block  bg-red-300">
          <Cart
            products={cartProducts}
            onFinishOrder={handleToggleEmailModal}
            onRemoveProduct={handleRemoveProduct as never}
            onCloseCart={handleShowCart}
            showCart={!showMobileCart}
            finishOrderButtonDisabled={cartProducts.length < 1}
            totalProducts={totalCartProducts}
          />
        </div>
        <EmailModal
          isOpen={showEmailModal}
          onRequestClose={handleToggleEmailModal}
          email={email}
          setEmail={setEmail}
          finishOrderButtonDisabled={
            loading || createOrderLoading || !isEmailValid
          }
          onFinishOrder={handleFinishOrder}
        />
      </main>
    </div>
  );
}
