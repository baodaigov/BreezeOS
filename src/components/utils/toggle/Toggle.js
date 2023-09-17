import Hammer from "react-hammerjs";
import "./Toggle.scss";

export default function Toggle({ active, disabled, onToggle }) {
  return (
    <>
      {active ? (
        <Hammer onTap={onToggle} onSwipeLeft={onToggle}>
          <div
            className={`Toggle ${active && "active"} ${disabled && "disabled"}`}
          >
            <div className="ToggleThumb"></div>
          </div>
        </Hammer>
      ) : (
        <Hammer onTap={onToggle} onSwipeRight={onToggle}>
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
