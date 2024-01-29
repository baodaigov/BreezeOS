import Terminal from "@/containers/apps/terminal";
import Surface from "@/containers/apps/surface";
import Clock from "@/containers/apps/clock";
import Settings from "@/containers/apps/settings";
import Camera from "@/containers/apps/camera";
import Files from "@/containers/apps/files";
import Calculator from "@/containers/apps/calculator";
import TextEditor from "@/containers/apps/texteditor";
import SoftwareStore from "@/containers/apps/softwarestore";
import Calendar from "@/containers/apps/calendar";
import ImgView from "@/containers/apps/imgview";
import VSCode from "@/containers/apps/vscode";

interface WindowTypeProps {
  type: string;
}

export default function WindowType({ type }: WindowTypeProps) {
  function switchType() {
    switch (type) {
      case "surface":
        return <Surface id={type}/>;
      case "calendar":
        return <Calendar id={type}/>;
      case "settings":
        return <Settings id={type}/>;
      case "clock":
        return <Clock id={type}/>;
      case "camera":
        return <Camera id={type}/>;
      case "files":
        return <Files id={type}/>;
      case "calculator":
        return <Calculator id={type}/>;
      case "texteditor":
        return <TextEditor id={type}/>;
      case "terminal":
        return <Terminal id={type}/>;
      case "softwarestore":
        return <SoftwareStore id={type}/>;
      case "vscode":
        return <VSCode id={type}/>;
      case "imgview":
        return <ImgView id={type}/>;
    }
  }

  return switchType();
}
