import "./Panel.scss";
import Battery from "./Battery";
import PanelItem from "./PanelItem";

export default function PanelTop() {
  return (
    <div className="PanelTop">
      <Battery />
      <PanelItem type="shutdownMenu" />
    </div>
  );
}
