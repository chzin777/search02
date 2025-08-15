
import * as React from "react";
import * as RadixSlider from "@radix-ui/react-slider";

interface RatingSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const RatingSlider: React.FC<RatingSliderProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <label htmlFor="nota" className="mb-2 font-medium text-black">Nota (0 a 10)</label>
      <RadixSlider.Root
        className="relative flex items-center select-none touch-none w-full max-w-md h-8"
        min={0}
        max={10}
        step={1}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        aria-label="Nota"
      >
        <RadixSlider.Track className="bg-gray-200 relative grow rounded-full h-2">
          <RadixSlider.Range className="absolute bg-blue-500 rounded-full h-2" />
        </RadixSlider.Track>
  <RadixSlider.Thumb className="block w-6 h-6 bg-blue-600 border-2 border-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition hover:cursor-pointer" />
      </RadixSlider.Root>
      <span className="mt-2 text-lg font-bold text-blue-600">{value}</span>
    </div>
  );
};
