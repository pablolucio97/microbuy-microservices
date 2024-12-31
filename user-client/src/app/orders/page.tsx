"use client";
import Header from "@/components/Header";
import { useEmail } from "@/contexts/EmailContext";
import { CouponsRepository } from "@/repositories/couponsRepostory/CouponsRepository";
import { ICouponDTO } from "@/repositories/dtos/CouponDTO";
import { EmailsRepository } from "@/repositories/emailsRepository/EmailsRepository";
import { validateEmail } from "@/utils/validators";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import OrderCard from "./components/OrderCard";

export default function Orders() {
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState<ICouponDTO[]>([]);

  const { email } = useEmail();

  const emailsRepository = useMemo(() => {
    return new EmailsRepository();
  }, []);

  const couponsRepository = useMemo(() => {
    return new CouponsRepository();
  }, []);

  const listCoupons = useCallback(async () => {
    try {
      const coupons = await couponsRepository.listCoupons();
      setCoupons(coupons);
      return coupons;
    } catch (error) {
      console.log(error);
    }
  }, [couponsRepository]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["coupons"],
    queryFn: listCoupons,
  });

  const sendEmail = useCallback(async () => {
    const isValidEmail = validateEmail(email);
    if (email && isValidEmail) {
      try {
        setLoading(true);
        await emailsRepository.sendEmail({
          to: email,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, [email, emailsRepository]);

  const pendentCoupons = useMemo(() => {
    return coupons.filter((coupon) => !coupon.processed);
  }, [coupons]);

  const sendEmails = useCallback(async () => {
    for (const coupon of pendentCoupons) {
      try {
        await sendEmail();
        console.log("Email sent for coupon:", coupon.id);
      } catch (error) {
        console.error("Failed to send email for coupon:", coupon.id, error);
      }
    }
  }, [pendentCoupons, sendEmail]);

  useEffect(() => {
    sendEmails();
  }, [sendEmails]);

  return (
    <div className="w-screen min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-r from-gray-800 to-gray-900">
          <Header />
      <main className="w-full flex md:pl-[4rem] mt-[6rem]">
        <div className="w-full px-8">
          <span className="text-textHeading  text-sm md:text-xl ml-3 text-white mt-2 mb-3">
            Your orders
          </span>
          <div className="w-full max-h-[90vh] p-3 overflow-y-auto overflow-x-hidden">
            {isLoading || loading ? (
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
