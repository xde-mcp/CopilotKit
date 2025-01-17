"use client";

import "@copilotkit/react-ui/styles.css";
import { useState, useEffect } from "react";
import { 
  useBuildCarState, 
  useGetContactInfoState,
  useGetPaymentInfoState, 
} from "@/lib/states";
import { useCopilotChat, useCopilotReadable } from "@copilotkit/react-core";
import { TextMessage, MessageRole } from "@copilotkit/runtime-client-gql";
import { useGlobalData } from "@/lib/states/global-data";
import { CopilotChat } from "@copilotkit/react-ui";
import { systemPrompt } from "@/lib/data/systemPrompt";
import { useConfirmOrderState } from "@/lib/states/use-order-state";

export function Chat() {
  const [initialMessageSent, setInitialMessageSent] = useState(false);
  const { contactInfo, selectedCar, state, setState, paymentInfo, orders } = useGlobalData();
  const { appendMessage, isLoading } = useCopilotChat();

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  // This is a huge hack to get an initial message to be sent to the chat from the Copilot.
  // It's a workaround for the fact that the Copilot doesn't support initial messages. 
  useEffect(() => {
    if (!initialMessageSent && !isLoading) {
      setTimeout(() => {
        appendMessage(
          new TextMessage({
            content: "Hi, I'm Fio, your AI car salesman. First, let's get your contact information before we get started.",
            role: MessageRole.Assistant,
          }),
        );
        setInitialMessageSent(true);
      }, 500);
    }
  }, [initialMessageSent, appendMessage, isLoading]);

  useCopilotReadable({
    description: "Currently Specified Information",
    value: {
      contactInfo,
      selectedCar,
      paymentInfo,
      orders,
      currentState: `${state}`,
    },
  });

  useGetContactInfoState({ 
    enabled: state === "getContactInfo",
    onNextState: () => setState("buildCar")
  });
  
  useBuildCarState({ 
    enabled: state === "buildCar",
    onNextState: () => setState("getPaymentInfo")
  });

  useGetPaymentInfoState({ 
    enabled: state === "getPaymentInfo",
    onNextState: () => setState("confirmOrder")
  });

  useConfirmOrderState({ 
    enabled: state === "confirmOrder",
    onNextState: () => setState("buildCar")
  });

  return <div className="flex flex-col h-full max-h-full justify-center items-center h-full w-full rounded-2xl border border-blue-300 shadow-lg">
    <CopilotChat
      className="overflow-y-auto w-full h-full rounded-2xl"
      instructions={systemPrompt}
    />
  </div>
}
