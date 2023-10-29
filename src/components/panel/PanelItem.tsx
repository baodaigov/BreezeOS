import { inactivePanel, setPanelType } from "../../store/reducers/panel";
import "./Panel.scss";
import { setBatterySaver, setLocked } from "../../store/reducers/settings";
import { setOptionsMenuShown } from "../../store/reducers/lock";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface PanelItemProps {
  type?: string;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
}

export default function PanelItem({
  type,
  active,
  onClick,
  children,
}: PanelItemProps) {
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  function showShutdownMenu() {
    dispatch(inactivePanel());
    dispatch(setLocked(true));
    dispatch(setOptionsMenuShown(true));
  }

  switch (type) {
    case "shutdownMenu":
      return (
        <div
          className="PanelItem PanelItemInteraction"
          onClick={showShutdownMenu}
        >
          <i className="fa-regular fa-power-off" style={{ marginRight: "0" }} />
        </div>
      );
    case "batterySaver":
      return (
        <div
          className={`PanelItem PanelItemInteraction ${
            settings.batterySaver && "active"
          }`}
          onClick={() => dispatch(setBatterySaver(!settings.batterySaver))}
        >
          <i className="fa-regular fa-leaf" style={{ marginRight: "0" }} />
        </div>
      );
    case "clipboard":
      return (
        window.__TAURI_METADATA__ && (
          <div
            className="PanelItem PanelItemInteraction"
            onClick={() => dispatch(setPanelType("clipboard"))}
          >
            <i
              className="fa-regular fa-clipboard"
              style={{ marginRight: "0" }}
            />
          </div>
        )
      );
    default:
      return (
        <div className={`PanelItem ${active && "active"}`} onClick={onClick}>
          {children}
        </div>
      );
  }
}
