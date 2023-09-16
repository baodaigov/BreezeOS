import "./Toggle.scss";

export default function Toggle({ active, disabled, onToggle }) {
  return (
    <div
      className={`Toggle ${active && "active"} ${disabled && "disabled"}`}
      onClick={onToggle}
    >
      <div className="ToggleThumb"></div>
    </div>
  );
}
