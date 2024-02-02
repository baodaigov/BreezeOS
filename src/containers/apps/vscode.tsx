import { useEffect } from "react";
import { openUrl, closeUrl } from "@/store/reducers/vscode";
import "@/components/utils/window/Window.scss";
import TopBar from "@/components/utils/window/TopBar";
import WindowBody from "@/components/utils/window/WindowBody";
import "./assets/vscode.scss";
import TopBarInteraction from "@/components/utils/window/TopBarInteraction";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import {
  closeApp,
  hideApp,
  maximizeApp,
  minimizeApp,
} from "@/store/reducers/apps";

export default function VSCode({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const appIsActive = useAppSelector((state) => state.apps.appIsActive);
  const fullscreen = useAppSelector((state) => state.apps.fullscreen);
  const isActive = appIsActive[id].status === "active";
  const isHide = appIsActive[id].status === "hide";
  const isMinimized = appIsActive[id].minimized;
  const isFullScreen = fullscreen === id;
  const { t } = useTranslation();
  const url = useAppSelector((state) => state.vscode.url);

  useEffect(() => {
    if (isActive) {
      dispatch(openUrl());
    } else {
      dispatch(closeUrl());
    }
  }, [isActive]);

  return (
    <div className="VSCodeWindow">
      <Draggable handle="#TopBar">
        <div
          className={`Window vscode ${isActive && "active"} ${
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
            />
            <TopBarInteraction
              action="close"
              onClose={() => dispatch(closeApp(id))}
            />
          </TopBar>
          <WindowBody>
            <div className="VSCode">
              <iframe
                src={url}
                title="Visual Studio Code"
                allowFullScreen={true}
              />
            </div>
          </WindowBody>
        </div>
      </Draggable>
    </div>
  );
}
