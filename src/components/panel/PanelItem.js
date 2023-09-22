import { useDispatch } from "react-redux";
import { activePanel, inactivePanel } from "../../reducers/panel";
import "./Panel.scss";
import { setLocked } from "../../reducers/settings";
import { setOptionsMenuShown } from "../../reducers/lock";

const PanelItem = (props) => {
  const dispatch = useDispatch();

  function showShutdownMenu() {
    dispatch(inactivePanel());
    dispatch(setLocked(true));
    dispatch(setOptionsMenuShown(true));
  }

  switch (props.type) {
    case "default":
      return <div className="PanelItem font-bold">{props.title}</div>;

    case "shutdownMenu":
      return (
        <div
          className="PanelItem PanelItemInteraction"
          onClick={showShutdownMenu}
        >
          <i className="fa-solid fa-power-off" style={{ marginRight: "0" }}></i>
        </div>
      );
    default:
      return (
        <div className="PanelItem font-bold">
          Please define a specific type.
        </div>
      );
  }
};

export default PanelItem;
