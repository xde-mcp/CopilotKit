"use client";

import { Orders } from "@/components/orders";
import { useGlobalData } from "@/lib/states/global-data";

export default function Home() {
  const { orders } = useGlobalData();

  return <div className="border border-blue-300 rounded-2xl h-full bg-white">
    <div className="flex flex-col gap-2 bg-blue-500 p-4 rounded-t-2xl">
      <h1 className="text-lg text-white">📦 Your Orders</h1>
    </div>
    <div className="p-4">
      <Orders orders={orders} />
    </div>
  </div>
}
