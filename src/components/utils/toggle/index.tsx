import Hammer from "react-hammerjs";
import "./index.scss";
import { Theme } from "types";
import { useAppSelector } from "@/store/hooks";

interface ToggleProps {
  active: boolean;
  size?: number;
  color?: string;
  theme?: Theme;
  disabled?: boolean;
  onToggle: HammerListener;
}

export default function Toggle({
  active,
  size = 1,
  color = "#2563eb",
  theme = "system",
  disabled,
  onToggle,
}: ToggleProps) {
  const lightMode = useAppSelector((state) => state.appearance.themeLight);

  return active ? (
    <Hammer onTap={onToggle} onPressUp={onToggle} onSwipeLeft={onToggle}>
      <div
        className={`Toggle active ${disabled && "disabled"} ${
          theme === "dark"
            ? "darkTheme"
            : theme === "system" && lightMode
            ? "darkTheme"
            : ""
        }`}
        style={{ transform: `scale(${size})`, backgroundColor: color }}
      >
        <div className="ToggleThumb" />
      </div>
    </Hammer>
  ) : (
    <Hammer onTap={onToggle} onPressUp={onToggle} onSwipeRight={onToggle}>
      <div
        className={`Toggle ${disabled && "disabled"} ${
          theme === "dark"
            ? "darkTheme"
            : theme === "system" && lightMode
            ? "darkTheme"
            : ""
        }`}
        style={{ transform: `scale(${size})` }}
      >
        <div className="ToggleThumb" />
      </div>
    </Hammer>
  );
}
