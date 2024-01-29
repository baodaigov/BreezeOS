import { useAppSelector } from "@/store/hooks";
import "./Window.scss";
import React from "react";

interface TopBarProps extends React.HTMLAttributes<HTMLDivElement> {
  onDblClick?: React.MouseEventHandler<HTMLDivElement>;
  title?: string;
}

export default function TopBar({
  onDblClick,
  title,
  children,
  ...props
}: TopBarProps) {
  const shellTheme = useAppSelector((state) => state.shell.theme);

  return (
    <div
      className={`TopBar ${shellTheme === "WhiteSur" && "whitesur"}`}
      {...props}
    >
      <div id="TopBar" onDoubleClick={onDblClick} />
      <p className="TopBarTitle">{title}</p>
      <div className="TopBarInteractionContainer">{children}</div>
    </div>
  );
}
