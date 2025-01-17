import { ShowCar, ShowCars } from "@/components/chat/show-car";
import { Car, cars } from "@/lib/data/cars";
import { 
  useCopilotAction, 
  useCopilotReadable, 
  useCopilotAdditionalInstructions,
} from "@copilotkit/react-core";
import { useGlobalData } from "./global-data";

export interface UseBuildCarStateOptions {
  enabled: boolean;
  onNextState: () => void;
}

export function useBuildCarState({ enabled, onNextState }: UseBuildCarStateOptions) {
  const { setSelectedCar } = useGlobalData();

  useCopilotAdditionalInstructions({
    instructions: "CURRENT STATE: You are now helping the user select a car. TO START, say 'Thank you for that information! What sort of car would you like to see?'. If you have a car in mind, give a reason why you recommend it and then call the 'showCar' action with the car you have in mind.",
    available: enabled ? "enabled" : "disabled"
  }, [enabled])

  useCopilotReadable({
    description: "Car Inventory",
    value: cars,
    available: enabled ? "enabled" : "disabled"
  }, [enabled])
  
  useCopilotAction({
    name: "nextState",
    description: "Proceed to next state do not call this action unless the user has selected a car",
    available: enabled ? "enabled" : "disabled",
    handler: async () => {alert("nextState"); onNextState()}
  }, [enabled])

  useCopilotAction({
    name: "showCar",
    description: "Show Car a single car that you have in mind. Do not call this more than once, call `showMultipleCars` if you have multiple cars to show.",
    available: enabled ? "enabled" : "disabled",
    parameters: [
      {
        name: "make",
        type: "string",
        description: "The make of the car (e.g., Toyota, Honda)",
        required: true
      },
      {
        name: "model",
        type: "string",
        description: "The model of the car (e.g., Camry, Civic)",
        required: true
      },
      {
        name: "year",
        type: "number",
        description: "The year of the car",
        required: true
      },
      {
        name: "color",
        type: "string",
        description: "The color of the car",
        required: true
      },
      {
        name: "price",
        type: "number",
        description: "The price of the car in USD",
        required: true
      }
    ],
    renderAndWaitForResponse: ({ args, status, respond }) => {
      const { make, model, year, color, price } = args;

      return (
        <ShowCar 
          car={{ make, model, year, color, price }} 
          status={status}
          onSelect={() => {
            setSelectedCar({ make, model, year, color, price })
            respond?.("User has selected a car you can see it in your readables, you are now moving to the next state")
            onNextState()
          }}
          onReject={() => respond?.("User wants to select a different car, please stay in this state and help them select a different car")}
        />
      )
    }
  }, [enabled])

  useCopilotAction({
    name: "showMultipleCars",
    description: "Show a list of cars based on the user's query. Do not call this more than once. Call `showCar` if you only have a single car to show.",
    parameters: [
      { 
        name: "cars", 
        type: "object[]", 
        attributes: [
          { name: "make", type: "string" }, 
          { name: "model", type: "string" }, 
          { name: "year", type: "number" }, 
          { name: "color", type: "string" }, 
          { name: "price", type: "number" }
        ] 
      }
    ],
    renderAndWaitForResponse: ({ args, status, respond }) => {
      return <ShowCars 
        cars={args.cars as Car[] || []} 
        status={status} 
        onSelect={(car) => {
          setSelectedCar(car)
          respond?.("User has selected a car you can see it in your readables, you are now moving to the next state")
          onNextState()
        }} 
      />
    }
  }, [enabled])
}