import { useSelector } from "react-redux";
import "./Window.scss";

export default function TopBar({ onDblClick, title, children }) {
  const shellTheme = useSelector((state) => state.shell.theme);

  return (
    <div
      className={`TopBar ${shellTheme === "WhiteSur" ? "whitesur" : ""}`}
      onDoubleClick={onDblClick}
    >
      <p className="TopBarTitle">{title}</p>
      <div className="TopBarInteractionContainer">{children}</div>
    </div>
  );
}
