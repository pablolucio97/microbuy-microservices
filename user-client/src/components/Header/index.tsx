import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full flex items-center  bg-gradient-to-r from-gray-700 to-gray-600 p-4 fixed z-[1]">
      <div className="flex items-center">
        <div className="flex items-center">
          <FaShoppingCart className="w-8 h-8 text-primaryLight" />
          <h1 className="text-textHeading text-md md:text-xl ml-3 font-bold mt-2 text-white">
            MicroBuy
          </h1>
        </div>
        <ul className="flex items-center ml-[3rem] mt-2">
          <li>
            <Link href="/" className="mr-4 text-white text-sm md:text-lg">
              Products
            </Link>
          </li>
          <li>
            <Link href="/orders" className="text-white text-sm md:text-lg">
              Orders
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
