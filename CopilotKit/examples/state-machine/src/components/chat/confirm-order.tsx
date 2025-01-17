import React from 'react';
import { Order } from '../../lib/data/orders';
import { Car } from '@/lib/data/cars';
import { ContactInfo } from '@/lib/data/contact-info';
import { PaymentInfo } from '@/lib/data/payment-info';
import { AnimatedCard } from './animated-card';

interface ConfirmOrderProps {
  car: Car;
  contactInfo: ContactInfo;
  paymentInfo: PaymentInfo;
  onConfirm: () => void;
  onCancel: () => void;
  status: "complete" | "executing" | "inProgress";
}

export const ConfirmOrder = ({
  car,
  contactInfo,
  paymentInfo,
  onConfirm,
  onCancel,
  status,
}: ConfirmOrderProps) => {
  return (
    <AnimatedCard className="bg-white rounded-lg shadow p-6 max-w-2xl" status={status}>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 tracking-tight">Review Your Order</h2>
      
      {/* Car Details */}
      <div className="mb-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center gap-2">
          <span>🚗</span> Vehicle Details
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <p className="text-gray-600"><span className="font-medium text-blue-600">Make:</span> {car.make}</p>
          <p className="text-gray-600"><span className="font-medium text-blue-600">Model:</span> {car.model}</p>
          <p className="text-gray-600"><span className="font-medium text-blue-600">Year:</span> {car.year}</p>
          <p className="text-gray-600"><span className="font-medium text-blue-600">Color:</span> {car.color}</p>
          <p className="text-gray-600"><span className="font-medium text-blue-600">Price:</span> ${car.price?.toLocaleString()}</p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center gap-2">
          <span>👤</span> Contact Details
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <p className="text-gray-600"><span className="font-medium text-blue-600">Name:</span> {contactInfo.name}</p>
          <p className="text-gray-600"><span className="font-medium text-blue-600">Email:</span> {contactInfo.email}</p>
          <p className="text-gray-600"><span className="font-medium text-blue-600">Phone:</span> {contactInfo.phone}</p>
        </div>
      </div>

      {/* Payment Information */}
      <div className="mb-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center gap-2">
          <span>💳</span> Payment Details
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <p className="text-gray-600"><span className="font-medium text-blue-600">Card Type:</span> {paymentInfo?.type}</p>
          <p className="text-gray-600"><span className="font-medium text-blue-600">Card Number:</span> ****-****-****-{paymentInfo?.cardNumber?.slice(-4)}</p>
        </div>
      </div>

      {/* Action Buttons */}
      {status !== "complete" && (
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Confirm Order
          </button>
        </div>
      )}
    </AnimatedCard>
  );
};
