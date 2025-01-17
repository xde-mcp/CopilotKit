import type { Car } from "../data/cars";

type Parameter = {
  name: string;
  type: string;
  description: string;
  required: boolean;
};

export function carToParameters(): Parameter[] {
  return [
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
  ];
} 