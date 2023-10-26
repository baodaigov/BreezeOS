import "./Checkbox.scss";

interface CheckboxProps {
  active: boolean;
  size?: number;
  disabled?: boolean;
  onToggle: React.MouseEventHandler<HTMLDivElement>;
}

export default function Checkbox({
  active,
  size,
  disabled,
  onToggle,
}: CheckboxProps) {
  return (
    <div
      className={`Checkbox ${active && "active"} ${disabled && "disabled"}`}
      style={{ transform: `scale(${size})` }}
      onClick={onToggle}
    >
      <i className="fa-regular fa-check" />
    </div>
  );
}
