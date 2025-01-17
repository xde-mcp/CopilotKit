import { 
  useCopilotAction, 
  useCopilotAdditionalInstructions, 
} from "@copilotkit/react-core";
import { useGlobalData } from "./global-data";
import { ConfirmOrder } from "@/components/chat/confirm-order";
import { ContactInfo } from "../data/contact-info";
import { Car } from "../data/cars";
import { PaymentInfo } from "../data/payment-info";

export interface UseConfirmOrderStateOptions {
  enabled: boolean;
  onNextState: () => void;
}

export function useConfirmOrderState({ enabled, onNextState }: UseConfirmOrderStateOptions) {
  const { setOrders, selectedCar, contactInfo, paymentInfo } = useGlobalData();

  useCopilotAdditionalInstructions({
    instructions: "CURRENT STATE: You are now confirming the order of the user. Say, 'Great! Now let's just confirm your order. Here is the summary of your order. ' and then call the 'confirmOrder' action. Instead of giving a summary in text you should instead use the 'confirmOrder' action.",
    available: enabled ? "enabled" : "disabled"
  }, [enabled])
  
  useCopilotAction({
    name: "nextState",
    description: "Proceed to next state",
    available: enabled ? "enabled" : "disabled",
    handler: async () => onNextState(),
  }, [enabled])


  useCopilotAction({
    name: "confirmOrder",
    description: "Confirm the order of the user",
    available: enabled ? "enabled" : "disabled",
    renderAndWaitForResponse: ({ status, respond }) => {
      return (
        <ConfirmOrder
          status={status}
          car={selectedCar || {} as Car}
          contactInfo={contactInfo || {} as ContactInfo}
          paymentInfo={paymentInfo || {} as PaymentInfo}
          onConfirm={() => {
            setOrders((prevOrders) => [
                ...prevOrders,
                {
                    car: selectedCar || {} as Car,
                    contactInfo: contactInfo || {} as ContactInfo,
                    paymentInfo: paymentInfo || {} as PaymentInfo,
                }
            ])
            respond?.("User confirmed their order, please ask them if they would like to place a another order and if they do, call the 'nextState' action.")
          }}
          onCancel={() => {
            respond?.("User cancelled their order, please ask them if they'd like to start over with a new order or if they'd like to continue with their current order. If they'd like to start over, call the 'nextState' action. If they'd like to continue with their current order, call the 'confirmOrder' action.")
          }}
        />
      )
    }
  }, [enabled])
}