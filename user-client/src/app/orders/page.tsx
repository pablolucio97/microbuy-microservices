"use client";
import { CouponsRepository } from "@/repositories/couponsRepostory/CouponsRepository";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import OrderCard from "./components/OrderCard";

export default function Orders() {
  const couponsRepository = useMemo(() => {
    return new CouponsRepository();
  }, []);

  const listCoupons = async () => {
    try {
      const coupons = await couponsRepository.listCoupons();
      return coupons;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["coupons"],
    queryFn: listCoupons,
  });

  return (
    <div className="w-screen min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-r from-gray-800 to-gray-900">
      <main className="w-full flex md:pl-[4rem]">
        <div className="w-full px-8">
          <h1 className="text-textHeading text-xl md:text-2xl ml-3 font-bold my-2 text-white">
            MicroBuy
          </h1>
          <span className="text-textHeading  text-sm md:text-xl ml-3 text-white mt-2 mb-3">
            Your orders
          </span>
          <div className="w-full max-h-[90vh] p-3 overflow-y-auto overflow-x-hidden">
            {isLoading ? (
              <span className="text-textHeading  text-sm md:text-xl ml-3 text-white mt-2 mb-3">
                Loading...
              </span>
            ) : error ? (
              <span className="text-textHeading  text-sm md:text-xl ml-3 text-white mt-2 mb-3">
                Something went wrong. Please, try again later.
              </span>
            ) : (
              data &&
              data.map((order) => (
                <OrderCard
                  key={order.id}
                  id={order.id}
                  total={order.total}
                  wasProcessed={order.processed}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
