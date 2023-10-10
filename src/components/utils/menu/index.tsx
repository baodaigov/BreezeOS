import { forwardRef } from "react";
import "./index.scss";
import { useAppSelector } from "@/store/hooks";

interface ActMenuSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  active?: boolean;
}

export const ActMenuSelector: React.FC<ActMenuSelectorProps> = ({
  title,
  active,
  children,
  ...props
}) => {
  return (
    <div className="ActMenuSelector" {...props}>
      <p>{title}</p>
      <i className={`fa-regular fa-check ${active ? "active" : ""}`} />
      {children}
    </div>
  );
};

interface ActMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

const ActMenu = forwardRef<HTMLDivElement, ActMenuProps>(
  ({ className, children, ...props }, ref) => {
    const shellTheme = useAppSelector((state) => state.shell.theme);

    return (
      <div
        className={`ActMenu ${className} ${
          shellTheme === "WhiteSur" ? "whitesur" : ""
        }`}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export default ActMenu;
