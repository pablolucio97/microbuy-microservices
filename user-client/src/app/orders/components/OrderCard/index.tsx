import { formatBRL } from "@/utils/format";

interface OrderCardProps {
  id: string;
  total: number;
  wasProcessed: boolean;
}

export default function OrderCard({ id, total, wasProcessed }: OrderCardProps) {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-md mb-3 mr-3 bg-gradient-to-r from-gray-700 to-gray-800">
      <strong className="text-white text-xs lg:text-[14px]">Order {id}</strong>
      <div className="flex items-center justify-between">
        <span className="text-white text-xs lg:text-[14px]">
          {formatBRL(total)}
        </span>
        {wasProcessed ? (
          <span className="text-xs lg:text-[14px] text-green-600 font-bold ml-8">
            Finished
          </span>
        ) : (
          <span className="text-xs lg:text-[14px] text-orange-400 font-bold ml-8">
            Processing...
          </span>
        )}
      </div>
    </div>
  );
}
