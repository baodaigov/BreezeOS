import "@/components/utils/window/Window.scss";
import TopBar from "@/components/utils/window/TopBar";
import WindowBody from "@/components/utils/window/WindowBody";
import "./assets/terminal.scss";
import TopBarInteraction from "@/components/utils/window/TopBarInteraction";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeApp,
  enterFullScreen,
  hideApp,
  maximizeApp,
  minimizeApp,
} from "@/store/reducers/apps";

export default function Terminal({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const appIsActive = useAppSelector((state) => state.apps.appIsActive);
  const fullscreen = useAppSelector((state) => state.apps.fullscreen);
  const isActive = appIsActive[id].status === "active";
  const isHide = appIsActive[id].status === "hide";
  const isMinimized = appIsActive[id].minimized;
  const isFullScreen = fullscreen === id;
  const { t } = useTranslation();
  const system = useAppSelector((state) => state.system);

  return (
    <div className="terminalWindow">
      <Draggable handle="#TopBar">
        <div
          className={`Window terminal ${isActive && "active"} ${
            isHide && "hide"
          } ${isMinimized && "minimize"} ${isFullScreen && "fullscreen"}`}
        >
          <TopBar
            title={t(`apps.${id}.name`)}
            onDblClick={() =>
              isMinimized
                ? dispatch(maximizeApp(id))
                : dispatch(minimizeApp(id))
            }
          >
            <TopBarInteraction
              action="hide"
              onHide={() => dispatch(hideApp(id))}
            />
            <TopBarInteraction
              action={isMinimized ? "max" : "min"}
              onMinMax={() =>
                isMinimized
                  ? dispatch(maximizeApp(id))
                  : dispatch(minimizeApp(id))
              }
              onPress={() => dispatch(enterFullScreen(id))}
            />
            <TopBarInteraction
              action="close"
              onClose={() => dispatch(closeApp(id))}
            />
          </TopBar>
          <WindowBody>
            <div className="Terminal">
              <pre>Welcome to BreezeOS ({system.kernel})</pre>
              <div id="input">
                <pre>&#91;localhost@breezeos&#93;$</pre>
                <input className="line" spellCheck={false} />
              </div>
            </div>
          </WindowBody>
        </div>
      </Draggable>
    </div>
  );
}
