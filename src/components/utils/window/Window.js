import "./Window.scss";
import Terminal from "../../../containers/apps/terminal";
import Surface from "../../../containers/apps/surface";
import Clock from "../../../containers/apps/clock";
import Settings from "../../../containers/apps/settings";
import Camera from "../../../containers/apps/camera";
import Files from "../../../containers/apps/files";
import Calculator from "../../../containers/apps/calculator";
import TextEditor from "../../../containers/apps/texteditor";
import SoftwareStore from "../../../containers/apps/softwarestore";
import Calendar from "../../../containers/apps/calendar";
import ImgView from "../../../containers/apps/imgview";
import VSCode from "../../../containers/apps/vscode";

export default function Window() {
  return (
    <div className="WindowContainer">
      <Surface />
      <Calendar />
      <Settings />
      <Clock />
      <Camera />
      <Files />
      <Calculator />
      <TextEditor />
      <Terminal />
      <SoftwareStore />
      <VSCode />
      <ImgView />
    </div>
  );
}
