import { Car, cars } from "./cars";
import { ContactInfo } from "./contact-info";
import { PaymentInfo, availablePaymentInfo } from "./payment-info";

export type Order = {
  car: Car;
  contactInfo: ContactInfo;
  paymentInfo: PaymentInfo;
}

export const defaultOrders: Order[] = [
    {
        car: cars[0],
        contactInfo: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "1234567890"
        },
        paymentInfo: availablePaymentInfo[0]
    }
];