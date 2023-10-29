import { useState, useEffect } from "react";
import { openUrl, closeUrl } from "../../store/reducers/vscode";
import { setActive, setHide } from "../../store/reducers/apps/vscode";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBody from "../../components/utils/window/WindowBody";
import DockItem from "../../components/dock/DockItem";
import "./assets/vscode.scss";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import StartApp from "../../components/startMenu/StartApp";
import { setHeaderHide } from "../../store/reducers/header";
import { useTranslation } from "react-i18next";
import { setDesktopBodyActive } from "../../store/reducers/desktopbody";
import { setStartMenuActive } from "../../store/reducers/startmenu";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export const VSCodeApp = () => {
  const { t } = useTranslation();
  const isActive = useAppSelector((state) => state.appsVscode.active);
  const isHide = useAppSelector((state) => state.appsVscode.hide);
  const dispatch = useAppDispatch();
  const icon = useAppSelector((state) => state.appearance.iconTheme);

  return (
    <DockItem
      id="vscode"
      className={`VSCodeApp ${isActive && "clicked"} ${isHide && "hide"}`}
      title="Visual Studio Code"
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/visual-studio-code.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/visual-studio-code.svg"
      }
      menu={[
        [
          {
            label: isHide ? t("apps.unhide") : t("apps.hide"),
            disabled: isActive ? false : true,
            action: () =>
              isHide ? dispatch(setHide(false)) : dispatch(setHide(true)),
          },
          {
            label: isActive ? t("apps.quit") : t("apps.open"),
            action: () =>
              isActive ? dispatch(setActive(false)) : dispatch(setActive(true)),
          },
        ],
      ]}
      onClick={() =>
        isHide ? dispatch(setHide(false)) : dispatch(setActive(true))
      }
    />
  );
};

export const VSCodeStartApp = () => {
  const isHide = useAppSelector((state) => state.appsVscode.hide);
  const dispatch = useAppDispatch();
  const icon = useAppSelector((state) => state.appearance.iconTheme);

  const toggle = () => {
    dispatch(setStartMenuActive(false));
    dispatch(setHeaderHide(false));
    dispatch(setDesktopBodyActive(true));
    if (isHide) {
      dispatch(setHide(false));
    } else {
      dispatch(setActive(true));
      setTimeout(() => dispatch(openUrl()), 500);
    }
  };

  return (
    <StartApp
      key="vscode"
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/visual-studio-code.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/visual-studio-code.svg"
      }
      name="Visual Studio Code"
      onClick={toggle}
    />
  );
};

export default function VSCode() {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((state) => state.appsVscode.active);
  const isHide = useAppSelector((state) => state.appsVscode.hide);
  const [min, isMin] = useState<boolean>(false);
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
      <Draggable handle=".TopBar">
        <div
          className={`Window vscode ${isActive && "active"} ${
            isHide && "hide"
          } ${min && "minimize"}`}
        >
          <TopBar title="Visual Studio Code" onDblClick={() => isMin(!min)}>
            <TopBarInteraction
              action="hide"
              onHide={() => dispatch(setHide(true))}
            />
            <TopBarInteraction
              action={min ? "max" : "min"}
              onMinMax={() => isMin(!min)}
            />
            <TopBarInteraction
              action="close"
              onClose={() => dispatch(setActive(false))}
            />
          </TopBar>
          <WindowBody>
            <div className="VSCode">
              <iframe
                src={url}
                title="Visual Studio Code"
                frameBorder="0"
                allowFullScreen={true}
              />
            </div>
          </WindowBody>
        </div>
      </Draggable>
    </div>
  );
}
