"use client";
import Cart from "@/components/Cart";
import EmailModal from "@/components/EmailModal";
import ProductCard from "@/components/ProductCard";
import { useListProductsQuery } from "@/graphql/graphql";
import { IProduct } from "@/interfaces/products";
import { CouponsRepository } from "@/repositories/couponsRepostory/CouponsRepository";
import { EmailsRepository } from "@/repositories/emailsRepository/EmailsRepository";
import { validateEmail } from "@/utils/validators";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Home() {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const MEDIUM_DEVICE_BREAKPOINT = 768;

  const emailsRepository = useMemo(() => {
    return new EmailsRepository();
  }, []);

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

  const sendEmail = async () => {
    try {
      setLoading(true);
      await emailsRepository.sendEmail({
        to: email,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleToggleEmailModal();
    }
  };

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

  useEffect(() => {
    const MIN_EMAIL_LENGTH = 5;
    if (email.length > MIN_EMAIL_LENGTH) {
      setIsEmailValid(validateEmail(email));
    }
  }, [email]);

  const handleFinishOrder = useCallback(async () => {
    try {
      await createCoupon();
    } catch (error) {
      console.log(error);
    }
  }, [createCoupon]);

  return (
    <div className="w-screen min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-r from-gray-800 to-gray-900">
      <main className="w-full flex md:pl-[4rem]">
        <div className={showMobileCart ? "hidden" : "w-full md:px-8"}>
          <h1 className="text-textHeading text-xl md:text-2xl ml-3 font-bold mt-2 text-white">
            MicroBuy
          </h1>
          <span className="text-textHeading  text-sm md:text-xl ml-3 text-white">
            Select the products to emit your order
          </span>
          <div className="w-full max-h-[90vh] overflow-y-auto overflow-x-hidden scrollable-div mt-4">
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
            className="h-8 flex flex-col justify-center items-center p-4 py-6 font-bold rounded-md bg-primaryLight text-textWhite md:hidden absolute top-4 right-4 text-sm lg:text-[14px]"
            onClick={handleShowCart}
          >
            Show cart
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
          finishOrderButtonDisabled={loading || !isEmailValid}
          onFinishOrder={handleFinishOrder}
        />
      </main>
    </div>
  );
}
