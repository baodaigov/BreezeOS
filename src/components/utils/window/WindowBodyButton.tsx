import React from "react";
import "./Window.scss";

interface WindowBodyButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function WindowBodyButton({
  children,
  ...props
}: WindowBodyButtonProps) {
  return (
    <div style={{ marginTop: "15px" }}>
      <div className="WindowBodyButton" {...props}>
        {children}
      </div>
    </div>
  );
}
