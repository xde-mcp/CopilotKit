import { RenderFunctionStatus } from "@copilotkit/react-core";
import { availablePaymentInfo, PaymentInfo as PaymentInfoType } from "@/lib/data/payment-info";
import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface PaymentInfoProps {
  onSubmit: (paymentInfo: PaymentInfoType) => void;
  status: RenderFunctionStatus;
}

// Separate component for credit card display
const CreditCard = ({ 
  paymentInfo, 
  onClick, 
  isSelected, 
  isAnySelected 
}: { 
  paymentInfo: PaymentInfoType;
  onClick: () => void;
  isSelected: boolean;
  isAnySelected: boolean;
}) => {
  const cardClassName = cn(
    "w-[350px] h-[200px] rounded-xl p-6 relative overflow-hidden transition-all duration-300",
    !isAnySelected 
      ? 'hover:transform hover:-translate-y-2 hover:shadow-xl cursor-pointer' 
      : 'cursor-not-allowed'
  );

  return (
    <button 
      onClick={onClick}
      className={cardClassName}
      style={{
        background: "linear-gradient(135deg, #000428 0%, #004e92 100%)",
      }}
    >
      <div className="text-white space-y-4">
        {/* Card Header */}
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">{paymentInfo.name}</div>
          <div className="text-2xl">💳</div>
        </div>
        
        {/* Card Number */}
        <div className="text-2xl tracking-wider flex justify-center w-full font-mono mt-8 mb-4">
          **** **** **** {paymentInfo?.cardNumber?.slice(-4)}
        </div>
        
        {/* Card Footer */}
        <div className="flex justify-between items-end mt-8">
          <div>
            <div className="text-xs opacity-80">VALID THRU</div>
            <div>{paymentInfo.cardExpiration}</div>
          </div>
          <div className="text-right">
            <div className="text-xs opacity-80">TYPE</div>
            <div>{paymentInfo.type}</div>
          </div>
        </div>
      </div>
    </button>
  );
};

export function PaymentInfo({ onSubmit }: PaymentInfoProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardSelect = (paymentInfo: PaymentInfoType) => {
    setSelectedCard(paymentInfo.name);
    onSubmit(paymentInfo);
  };

  const renderCard = (paymentInfo: PaymentInfoType, index: number) => (
    <motion.div
      key={paymentInfo.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex-shrink-0"
    >
      <CreditCard 
        paymentInfo={paymentInfo} 
        onClick={() => handleCardSelect(paymentInfo)}
        isSelected={selectedCard === paymentInfo.name}
        isAnySelected={selectedCard !== null}
      />
    </motion.div>
  );

  return (
    <div className="w-full">
      { !selectedCard && <h1 className="text-2xl font-bold mb-2">Your payment methods</h1>}
      <div className="flex flex-row overflow-x-auto gap-4 py-4 w-full min-w-0 pb-6">
        {availablePaymentInfo
          .filter(paymentInfo => selectedCard === null || selectedCard === paymentInfo.name)
          .map(renderCard)}
      </div>
    </div>
  );
}