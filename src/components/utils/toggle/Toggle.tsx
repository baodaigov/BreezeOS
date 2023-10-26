import Hammer from "react-hammerjs";
import "./Toggle.scss";

interface ToggleProps {
  active: boolean;
  size?: number;
  color?: string;
  disabled?: boolean;
  onToggle: HammerListener;
}

export default function Toggle({
  active,
  size = 1,
  color = "#2563eb",
  disabled,
  onToggle,
}: ToggleProps) {
  return active ? (
    <Hammer onTap={onToggle} onPressUp={onToggle} onSwipeLeft={onToggle}>
      <div
        className={`Toggle ${active && "active"} ${disabled && "disabled"}`}
        style={{ transform: `scale(${size})`, backgroundColor: color }}
      >
        <div className="ToggleThumb"></div>
      </div>
    </Hammer>
  ) : (
    <Hammer onTap={onToggle} onPressUp={onToggle} onSwipeRight={onToggle}>
      <div
        className={`Toggle ${active && "active"} ${disabled && "disabled"}`}
        style={{ transform: `scale(${size})` }}
      >
        <div className="ToggleThumb"></div>
      </div>
    </Hammer>
  );
}
