import "./Desktop.scss";
import Window from "./components/utils/window/Window";
import WindowDefault from "./components/utils/window/WindowDefault";
import Widget from "./components/Widget";
import { useAppSelector } from "./store/hooks";

const DesktopBody = () => {
  const isActive = useAppSelector((state) => state.desktopbody.active);

  return (
    <div className={`DesktopBody ${isActive && "active"}`}>
      <Widget />
      <Window />
      <WindowDefault />
    </div>
  );
};

export default DesktopBody;
