import "./Window.scss";
import { useAppSelector } from "../../../store/hooks";
import WindowType from "./WindowType";

export default function Window() {
  const appIsActive = useAppSelector((state) => state.apps.appIsActive);

  function renderWindows() {
    const windowsId: string[] = [];
    for (const id in appIsActive) {
      windowsId.push(...windowsId, id);
    }
    return windowsId.map((i) => <WindowType type={i} />);
  }

  return <div className="WindowContainer">{renderWindows()}</div>;
}
