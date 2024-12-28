import Cart from "@/components/Cart";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex flex-col overflow-x-hidden">
      <main className="w-full flex">
        <div className="w-full p-8">
          <h1 className="text-textHeading text-2xl font-bold">MicroBuy</h1>
        </div>
        <Cart />
      </main>
    </div>
  );
}
