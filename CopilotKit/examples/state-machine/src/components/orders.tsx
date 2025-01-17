import { Order } from '../lib/data/orders';
import { motion } from "motion/react";

interface OrdersProps {
  orders: Order[];
}

export function Orders({ orders }: OrdersProps) {
  if (!orders.length) return (
    <p className="text-gray-500 text-center">
      You currently have no orders. Talk to Fio to get started.
    </p>
  );

  return (
    <div className="space-y-4 p-4">
      {orders.map((order, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="bg-white rounded-lg border border-2 border-blue-300 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Order #{index + 1}</h3>
              <span className="text-sm text-gray-500">${order.car.price?.toLocaleString()}</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-x-8">
                <div>
                  <p className="text-sm text-gray-500">Vehicle</p>
                  <p className="text-gray-900">{order.car.year} {order.car.make} {order.car.model}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="text-gray-900">{order.contactInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment</p>
                  <p className="text-gray-900">•••• {order.paymentInfo?.cardNumber?.slice(-4)}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
