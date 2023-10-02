import Hammer from "react-hammerjs";
import "./Toggle.scss";

export default function Toggle({ active, disabled, onToggle }) {
  return (
    <>
      {active ? (
        <Hammer onTap={onToggle} onPressUp={onToggle} onSwipeLeft={onToggle}>
          <div
            className={`Toggle ${active && "active"} ${disabled && "disabled"}`}
          >
            <div className="ToggleThumb"></div>
          </div>
        </Hammer>
      ) : (
        <Hammer onTap={onToggle} onPressUp={onToggle} onSwipeRight={onToggle}>
          <div
            className={`Toggle ${active && "active"} ${disabled && "disabled"}`}
          >
            <div className="ToggleThumb"></div>
          </div>
        </Hammer>
      )}
    </>
  );
}
