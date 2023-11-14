

import { useAppSelector } from "@/store/hooks";

interface TemperatureProps extends React.HTMLAttributes<HTMLParagraphElement> {
  value: number;
  enableSymbol?: boolean;
}

export default function Temperature({
  value,
  enableSymbol,
  ...props
}: TemperatureProps) {
  const weather = useAppSelector((state) => state.weather);

  return (
    <p {...props}>
      {weather.temperature === "celsius"
        ? value
        : (value * 1.8 + 32).toFixed(1)}
      &deg;
      {enableSymbol && weather.temperature === "fahrenheit" ? "F" : "C"}
    </p>
  );
}
