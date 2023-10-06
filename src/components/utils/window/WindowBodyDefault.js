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

  switch (type) {
    case "critical":
      return (
        <div
          className={`WindowBodyDefault ${
            shellTheme === "WhiteSur" ? "whitesur" : ""
          }}`}
        >
          <div style={{ display: "flex" }}>
            <img
              className="WindowBodyIcon"
              src="https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/master/src/32/status/dialog-error.svg"
            />
            <div className="WindowBodyRight">
              <p className="WindowBodyTitle">{title}</p>
              <p className="WindowBodyContent">{content}</p>
            </div>
          </div>
          {children}
        </div>
      );
    case "exclamation":
      return (
        <div
          className={`WindowBodyDefault ${
            shellTheme === "WhiteSur" ? "whitesur" : ""
          }`}
        >
          <div style={{ display: "flex" }}>
            <img
              className="WindowBodyIcon"
              src="https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/master/src/32/status/dialog-warning.svg"
            />
            <div className="WindowBodyRight">
              <p className="WindowBodyTitle">{title}</p>
              <p className="WindowBodyContent">{content}</p>
            </div>
          </div>
          {children}
        </div>
      );
    default:
      return (
        <div
          className={`WindowBodyDefault ${
            shellTheme === "WhiteSur" ? "whitesur" : ""
          }`}
        >
          <div style={{ display: "flex" }}>
            <img className="WindowBodyIcon" src={icon} />
            <div className="WindowBodyRight">
              <p className="WindowBodyTitle">{title}</p>
              <p className="WindowBodyContent">{content}</p>
            </div>
          </div>
          {children}
        </div>
      );
  }
}
