import { 
  useCopilotAction, 
  useCopilotAdditionalInstructions, 
} from "@copilotkit/react-core";
import { PaymentInfo as PaymentInfoType } from "../data/payment-info";
import { useGlobalData } from "./global-data";
import { PaymentInfo } from "@/components/chat/payment-info";

export interface UseGetPaymentInfoStateOptions {
  enabled: boolean;
  onNextState: () => void;
}

export function useGetPaymentInfoState({ enabled, onNextState }: UseGetPaymentInfoStateOptions) {
  const { setPaymentInfo } = useGlobalData();

  useCopilotAdditionalInstructions({
    instructions: "CURRENT STATE: You are now getting the payment information of the user. Say, 'Great! Now I need to get your payment information.' and call the 'getPaymentInformation' action.",
    available: enabled ? "enabled" : "disabled"
  }, [enabled])
  
  useCopilotAction({
    name: "nextState",
    description: "Proceed to next state",
    available: enabled ? "enabled" : "disabled",
    handler: async () => onNextState(),
  }, [enabled])


  useCopilotAction({
    name: "getPaymentInformation",
    description: "Get the payment information of the user",
    available: enabled ? "enabled" : "disabled",
    renderAndWaitForResponse: ({ status, respond }) => {
      return (
        <PaymentInfo
          status={status}
          onSubmit={(paymentInfo: PaymentInfoType) => {
            setPaymentInfo(paymentInfo);
            respond?.("User has submitted their payment information, you are now moving to the next state")
            onNextState()
          }}
        />
      )
    }
  }, [enabled])
}