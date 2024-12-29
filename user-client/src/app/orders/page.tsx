import { orders } from "@/data/mock";
import OrderCard from "./components/OrderCard";

export default function Orders() {
  return (
    <div className="w-screen min-h-screen flex flex-col overflow-x-hidden">
      <main className="w-full flex md:pl-[4rem]">
        <div className="w-full px-8">
          <h1 className="text-textHeading text-2xl ml-3 font-bold mt-4">
            MicroBuy
          </h1>
          <span className="text-textHeading text-md ml-3 ">Your orders</span>
          <div className="w-full max-h-[90vh] p-3 overflow-y-auto overflow-x-hidden">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                id={order.id}
                total={order.total}
                wasProcessed={order.was_processed}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
