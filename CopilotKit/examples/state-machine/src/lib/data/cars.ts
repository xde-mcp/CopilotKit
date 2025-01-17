import { Parameter } from "@copilotkit/shared";

export type Car = {
  id?: number;
  make?: string;
  model?: string;
  year?: number;
  color?: string;
  price?: number;
}

export const cars: Car[] = [
  {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2024,
    color: "Red",
    price: 25000
  },
  {
    id: 2,
    make: "Toyota",
    model: "Camry",
    year: 2024,
    color: "Blue",
    price: 20000
  },
  {
    id: 3,
    make: "Toyota",
    model: "Camry",
    year: 2024,
    color: "Green",
    price: 22000
  },
  {
    id: 4,
    make: "Toyota",
    model: "Corolla",
    year: 2024,
    color: "Yellow",
    price: 18000
  },
  {
    id: 5,
    make: "Toyota",
    model: "Corolla",
    year: 2024,
    color: "Black",
    price: 15000
  },
  {
    id: 6,
    make: "Toyota",
    model: "Prius",
    year: 2024,
    color: "White",
    price: 27000
  },
  {
    id: 8,
    make: "Honda",
    model: "Civic",
    year: 2024,
    color: "Red",
    price: 25000
  },
  {
    id: 9,
    make: "Honda",
    model: "Civic",
    year: 2024,
    color: "Blue",
    price: 20000
  },
  {
    id: 10,
    make: "Honda",
    model: "Civic",
    year: 2024,
    color: "Green",
    price: 22000
  },
  {
    id: 11,
    make: "Honda",
    model: "Accord",
    year: 2024,
    color: "Yellow",
    price: 18000
  },
  {
    id: 12,
    make: "Honda",
    model: "Accord",
    year: 2024,
    color: "Black",
    price: 15000
  }
]

export function carAsParameters(): Parameter[] {
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