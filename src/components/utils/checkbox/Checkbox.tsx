import "./Checkbox.scss";

interface CheckboxProps {
  active: boolean;
  size?: number;
  color?: string;
  disabled?: boolean;
  onToggle: React.MouseEventHandler<HTMLDivElement>;
}

export default function Checkbox({
  active,
  size = 1,
  color = "#2563eb",
  disabled,
  onToggle,
}: CheckboxProps) {
  return active ? (
    <div
      className={`Checkbox active ${disabled && "disabled"}`}
      style={{ transform: `scale(${size})`, backgroundColor: color }}
      onClick={onToggle}
    >
      <i className="fa-regular fa-check" />
    </div>
  ) : (
    <div
      className={`Checkbox ${disabled && "disabled"}`}
      style={{ transform: `scale(${size})` }}
      onClick={onToggle}
    >
      <i className="fa-regular fa-check" />
    </div>
  );
}
