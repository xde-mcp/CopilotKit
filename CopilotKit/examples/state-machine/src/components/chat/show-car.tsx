import { cn } from "@/lib/cn";
import { Car } from "@/lib/data/cars";
import { RenderFunctionStatus } from "@copilotkit/react-core";
import { AnimatedCard } from "./animated-card";
import { motion } from "motion/react";

interface ShowCarProps {
  car: Car;
  onSelect: () => void;
  onReject?: () => void;
  status: RenderFunctionStatus;
  className?: string;
}

const ColorDisplay = ({ color }: { color?: string }) => {
  if (!color) return null;

  return (
    <span className="flex items-center gap-2">
      <span 
        className="w-4 h-4 rounded-full border border-gray-200" 
        style={{ backgroundColor: color }}
      />
      {color}
    </span>
  )
}

export function ShowCar({ car, onSelect, onReject, status, className }: ShowCarProps) {
  const carDetails = [
    { label: "Make", value: car.make },
    { label: "Model", value: car.model },
    { label: "Year", value: car.year },
    { label: "Color", value: <ColorDisplay color={car.color} /> },
    { label: "Price", value: `$${car.price?.toLocaleString()}`, bold: true }
  ];

  return (
    <AnimatedCard status={status} className={cn("min-w-[320px] p-6 shadow-lg hover:shadow-xl transition-shadow duration-300", className)}>
      <div className="space-y-4">
        <div className="space-y-2">
          {carDetails.map(({ label, value, bold }) => (
            <div key={label} className="flex justify-between items-center">
              <span className="font-semibold">{label}</span>
              <span className={bold ? "font-semibold" : ""}>{value}</span>
            </div>
          ))}
        </div>

        
        <div className={cn("flex gap-3", status === "complete" ? "hidden" : "animate-fade-in")}>
          <hr className="my-4 border-gray-200" />
          <button 
            className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            onClick={onSelect}
          >
            Select
          </button>
          {onReject && (
            <button 
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
              onClick={onReject}
            >
              Other options
            </button>
          )}
        </div>
      </div>
    </AnimatedCard>
  )
}

interface ShowCarsProps {
  cars: Car[];
  onSelect: (car: Car) => void;
  status: RenderFunctionStatus;
}

export function ShowCars({ cars, onSelect, status }: ShowCarsProps) {
  return (
    <div className="flex flex-row overflow-x-auto gap-4 py-4">
      {cars.map((car, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <ShowCar 
            car={car} 
            onSelect={() => onSelect(car)} 
            status={status}
          />
        </motion.div>
      ))}
    </div>
  )
}