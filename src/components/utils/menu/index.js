import { useSelector } from "react-redux";
import { forwardRef } from "react";
import "./index.scss";

export const ActMenuSelector = ({
  title,
  style,
  onClick,
  active,
  children,
}) => {
  return (
    <div className="ActMenuSelector" style={style} onClick={onClick}>
      <p>{title}</p>
      <i className={`fa-regular fa-check ${active ? "active" : ""}`} />
      {children}
    </div>
  );
};

function ActMenu(props, ref) {
  const shellTheme = useSelector((state) => state.shell.theme);
  return (
    <div
      className={`ActMenu ${props.className} ${
        shellTheme === "WhiteSur" ? "whitesur" : ""
      }`}
      style={props.style}
      ref={ref}
    >
      {props.children}
    </div>
  );
}

export default forwardRef(ActMenu);
