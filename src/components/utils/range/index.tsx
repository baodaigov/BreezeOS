import "./index.scss";
import { useAppSelector } from "@/store/hooks";

interface RangeSliderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function RangeSlider({ ...props }: RangeSliderProps) {
  const shellTheme = useAppSelector((state) => state.shell.theme);

  return (
    <input
      type="range"
      className={`Range ${shellTheme === "WhiteSur" ? "whitesur" : ""}`}
      {...props}
    />
  );
}
