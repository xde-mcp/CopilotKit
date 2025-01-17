import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { Car } from '@/lib/data/cars';
import { ContactInfo } from '@/lib/data/contact-info';
import { PaymentInfo } from '@/lib/data/payment-info';
import { Order, defaultOrders } from '@/lib/data/orders';

export type State = "buildCar" | "getContactInfo" | "getPaymentInfo" | "confirmOrder";

interface GlobalData {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
  selectedCar: Car | null;
  setSelectedCar: React.Dispatch<React.SetStateAction<Car | null>>;
  contactInfo: ContactInfo | null;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo | null>>;
  paymentInfo: PaymentInfo | null;
  setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentInfo | null>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export const GlobalDataContext = createContext<GlobalData | null>(null);

export function GlobalDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>("getContactInfo");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [orders, setOrders] = useState<Order[]>(defaultOrders);

  return <GlobalDataContext.Provider value={{
      state,
      setState,
      selectedCar,
      setSelectedCar,
      contactInfo,
      setContactInfo,
      paymentInfo,
      setPaymentInfo,
      orders,
      setOrders
    }}>
      {children}
    </GlobalDataContext.Provider>

}

export function useGlobalData() {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error('useGlobalData must be used within a GlobalDataProvider');
  }
  return context;
}
