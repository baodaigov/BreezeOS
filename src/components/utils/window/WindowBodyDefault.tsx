import { useAppSelector } from "@/store/hooks";
import "./Window.scss";
import React from "react";

interface WindowBodyDefaultProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: string;
  icon?: string;
  title?: string;
  content?: string;
}

export default function WindowBodyDefault({
  type,
  icon,
  title,
  content,
  children,
}: WindowBodyDefaultProps) {
  const shellTheme = useAppSelector((state) => state.shell.theme);

  function switchIcon() {
    switch (type) {
      case "critical":
        return (
          <img
            className="WindowBodyIcon"
            src="https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/master/src/32/status/dialog-error.svg"
          />
        );
      case "exclamation":
        return (
          <img
            className="WindowBodyIcon"
            src="https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/master/src/32/status/dialog-warning.svg"
          />
        );
      case "question":
        return (
          <img
            className="WindowBodyIcon"
            src="https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/master/src/32/status/dialog-question.svg"
          />
        );
      case "information":
        return (
          <img
            className="WindowBodyIcon"
            src="https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/master/src/32/status/dialog-information.svg"
          />
        );
      default:
        return <img className="WindowBodyIcon" src={icon} />;
    }
  }

  return (
    <div
      className={`WindowBodyDefault ${
        shellTheme === "WhiteSur" ? "whitesur" : ""
      }`}
    >
      <div style={{ display: "flex" }}>
        {switchIcon()}
        <div className="WindowBodyRight">
          {title && <p className="WindowBodyTitle">{title}</p>}
          {content && (
            <p
              className="WindowBodyContent"
              style={{ marginTop: title ? "8px" : 0 }}
            >
              {content}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
