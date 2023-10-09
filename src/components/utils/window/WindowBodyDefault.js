import { useSelector } from "react-redux";
import "./Window.scss";

export default function WindowBodyDefault({
  type,
  icon,
  title,
  content,
  children,
}) {
  const shellTheme = useSelector((state) => state.shell.theme);

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
          <p className="WindowBodyTitle">{title}</p>
          {content && <p className="WindowBodyContent">{content}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}
