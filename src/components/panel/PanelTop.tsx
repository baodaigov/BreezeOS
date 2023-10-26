import "./Panel.scss";
import Battery from "./Battery";
import PanelItem from "./PanelItem";

export default function PanelTop() {
  return (
    <div className="PanelTop">
      <Battery />
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <PanelItem type="batterySaver" />
        <PanelItem type="shutdownMenu" />
      </div>
    </div>
  );
}
