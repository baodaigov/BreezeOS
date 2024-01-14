import { forwardRef } from "react";
import "./index.scss";
import { useAppSelector } from "@/store/hooks";

export const ActMenuSeparator: React.FC<{
  margin?: number;
}> = ({ margin = 3 }) => {
  return (
    <div style={{ width: "100%", padding: "0 4px" }}>
      <div
        className="ActMenuSeparator"
        style={{ marginTop: `${margin}px`, marginBottom: `${margin}px` }}
      />
    </div>
  );
};

interface ActMenuSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: string;
  active?: boolean;
  disabled?: boolean;
  delay?: number;
  onClose?: React.MouseEventHandler<HTMLDivElement>;
}

export const ActMenuSelector: React.FC<ActMenuSelectorProps> = ({
  title,
  icon,
  active,
  disabled,
  delay = 0,
  children,
  onClick,
  onClose,
  ...props
}) => {
  return (
    <div
      className={`ActMenuSelector ${disabled && "disabled"}`}
      onClick={() => setTimeout(onClick!, delay)}
      onMouseUp={onClose}
      {...props}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {icon && <i className={icon} style={{ marginRight: "8px" }} />}
        <p>{title}</p>
      </div>
      <i className={`fa-regular fa-check ${active ? "active" : ""}`} />
      {children}
    </div>
  );
};

interface ActMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export default forwardRef<HTMLDivElement, ActMenuProps>(
  ({ className, children, ...props }, ref) => {
    const shellTheme = useAppSelector((state) => state.shell.theme);

    return (
      <div className="ActMenuWrapper" {...props}>
        <div
          className={`ActMenu ${className} ${
            shellTheme === "WhiteSur" ? "whitesur" : ""
          }`}
          ref={ref}
        >
          {children}
        </div>
      </div>
    );
  }
);
