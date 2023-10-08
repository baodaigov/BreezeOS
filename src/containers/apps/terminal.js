import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActive, setHide } from "../../reducers/apps/terminal";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBody from "../../components/utils/window/WindowBody";
import DockItem from "../../components/DockItem";
import "./assets/terminal.scss";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import StartApp from "../../components/startMenu/StartApp";
import { setHeaderHide } from "../../reducers/header";
import { useTranslation } from "react-i18next";
import { setDesktopBodyActive } from "../../reducers/desktopbody";
import { setStartMenuActive } from "../../reducers/startmenu";
import Draggable from "react-draggable";

export const TerminalApp = () => {
  const { t } = useTranslation();
  const isActive = useSelector((state) => state.appsTerminal.active);
  const isHide = useSelector((state) => state.appsTerminal.hide);
  const dispatch = useDispatch();
  const icon = useSelector((state) => state.appearance.iconTheme);

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.keyCode === 57) {
      dispatch(setActive(true));
    }
  });

  return (
    <DockItem
      id="terminal"
      className={`TerminalApp ${isActive && "clicked"} ${isHide && "hide"}`}
      title={t("apps.terminal.name")}
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/terminal.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/utilities-x-terminal.svg"
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

export const TerminalStartApp = () => {
  const { t } = useTranslation();
  const isHide = useSelector((state) => state.appsTerminal.hide);
  const dispatch = useDispatch();
  const icon = useSelector((state) => state.appearance.iconTheme);

  const toggle = () => {
    dispatch(setStartMenuActive(false));
    dispatch(setHeaderHide(false));
    dispatch(setDesktopBodyActive(true));
    if (isHide) {
      dispatch(setHide(false));
    } else {
      dispatch(setActive(true));
    }
  };

  return (
    <StartApp
      key="terminal"
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/terminal.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/utilities-x-terminal.svg"
      }
      name={t("apps.terminal.name")}
      onClick={toggle}
    />
  );
};

export default function Terminal() {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.appsTerminal.active);
  const isHide = useSelector((state) => state.appsTerminal.hide);
  const { t } = useTranslation();
  const [min, isMin] = useState(true);

  return (
    <div className="terminalWindow">
      <Draggable handle=".TopBar">
        <div
          className={`Window terminal ${isActive && "active"} ${
            isHide && "hide"
          } ${min && "minimize"}`}
        >
          <TopBar
            title={t("apps.terminal.name")}
            onDblClick={() => isMin(!min)}
          >
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
            <div className="Terminal">
              <pre>Welcome to BreezeOS (GNU/Linux 6.2.1 x86_64)</pre>
              <pre id="input">
                &#91;localhost@breezeos&#93;$
                <input type="text" spellCheck="false" />
              </pre>
            </div>
          </WindowBody>
        </div>
      </Draggable>
    </div>
  );
}
