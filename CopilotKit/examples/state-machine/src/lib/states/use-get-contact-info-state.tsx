import { ContactInfo } from "@/components/chat/contact-info";
import { 
  useCopilotAction, 
  useCopilotAdditionalInstructions, 
} from "@copilotkit/react-core";
import { useGlobalData } from "./global-data";

export interface UseGetContactInfoStateOptions {
  enabled: boolean;
  onNextState: () => void;
}

export function useGetContactInfoState({ enabled, onNextState }: UseGetContactInfoStateOptions) {
  const { setContactInfo } = useGlobalData();

  useCopilotAdditionalInstructions({
    instructions: "CURRENT STATE: You are now getting the contact information of the user.",
    available: enabled ? "enabled" : "disabled"
  }, [enabled])

  useCopilotAction({
    name: "nextState",
    description: "Proceed to next state",
    available: enabled ? "enabled" : "disabled",
    handler: async () => onNextState(),
  }, [enabled])

  useCopilotAction({
    name: "getContactInformation",
    description: "Get the contact information of the user",
    available: enabled ? "enabled" : "disabled",
    renderAndWaitForResponse: ({ status, respond }) => {
      return (
        <ContactInfo 
          status={status}
          onSubmit={(name, email, phone) => {
            setContactInfo({ name, email, phone });
            respond?.("User has submitted their contact information, please proceed to the next state.")
            onNextState()
          }}
        />
      )
    }
  }, [enabled])
}