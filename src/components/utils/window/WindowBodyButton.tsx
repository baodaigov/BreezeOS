import React from "react";
import "./Window.scss";

interface WindowBodyButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function WindowBodyButton({
  children,
  ...props
}: WindowBodyButtonProps) {
  return (
    <div className="WindowBodyButton" {...props}>
      {children}
    </div>
  );
}
