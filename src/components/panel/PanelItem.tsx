import { inactivePanel } from "../../store/reducers/panel";
import "./Panel.scss";
import { setLocked } from "../../store/reducers/settings";
import { setOptionsMenuShown } from "../../store/reducers/lock";
import { useAppDispatch } from "@/store/hooks";

interface PanelItemProps {
  type: string;
  title?: string;
}

export default function PanelItem({ type, title }: PanelItemProps) {
  const dispatch = useAppDispatch();

  function showShutdownMenu() {
    dispatch(inactivePanel());
    dispatch(setLocked(true));
    dispatch(setOptionsMenuShown(true));
  }

  switch (type) {
    case "default":
      return <div className="PanelItem font-bold">{title}</div>;

    case "shutdownMenu":
      return (
        <div
          className="PanelItem PanelItemInteraction"
          onClick={showShutdownMenu}
        >
          <i className="fa-solid fa-power-off" style={{ marginRight: "0" }} />
        </div>
      );
    default:
      return (
        <div className="PanelItem font-bold">
          Please define a specific type.
        </div>
      );
  }
}
