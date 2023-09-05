import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openUrl, closeUrl } from "../../reducers/vscode";
import { setActive, setHide } from "../../reducers/apps/vscode";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBody from "../../components/utils/window/WindowBody";
import DockItem from "../../components/DockItem";
import "./assets/vscode.scss";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import StartApp from "../../components/startMenu/StartApp";
import { setHeaderActive } from "../../reducers/header";

export const VSCodeApp = () => {
  const isActive = useSelector((state) => state.appsVscode.active);
  const isHide = useSelector((state) => state.appsVscode.hide);
  const dispatch = useDispatch();
  const icon = useSelector((state) => state.appearance.iconTheme);

  useEffect(() => {
    if (isActive) {
      document.getElementsByClassName("VSCodeApp")[0].classList.add("clicked");
      setTimeout(() => {
        document.getElementsByClassName("vscode")[0].classList.add("active");
        dispatch(openUrl());
      }, 500);
    } else {
      document
        .getElementsByClassName("VSCodeApp")[0]
        .classList.remove("clicked");
      document.getElementsByClassName("vscode")[0].classList.remove("active");
    }
    if (isHide) {
      document.getElementsByClassName("VSCodeApp")[0].classList.add("hide");
      document.getElementsByClassName("vscode")[0].classList.add("hide");
    } else {
      document.getElementsByClassName("VSCodeApp")[0].classList.remove("hide");
      document.getElementsByClassName("vscode")[0].classList.remove("hide");
    }
  }, [isActive, isHide]);

  return (
    <DockItem
      id="vscode"
      className="VSCodeApp"
      title="Visual Studio Code"
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/visual-studio-code.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/visual-studio-code.svg"
      }
      menu={[
        [
          {
            label: isActive ? "Quit" : "Open",
            action: () => isActive ? dispatch(setActive(false)) : dispatch(setActive(true)),
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
  const isHide = useSelector((state) => state.appsVscode.hide);
  const dispatch = useDispatch();
  const icon = useSelector((state) => state.appearance.iconTheme);

  const toggle = () => {
    document
      .getElementsByClassName("StartMenuWrapper")[0]
      .classList.remove("active");
    dispatch(setHeaderActive(true));
    document.getElementsByClassName("DesktopBody")[0].classList.add("active");
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
  const dispatch = useDispatch();
  const VSCodeWindow = () => {
    const [min, isMin] = useState(false);
    const url = useSelector((state) => state.vscode.url);

    function close() {
      dispatch(setActive(false));
      dispatch(closeUrl());
    }

    function minimize() {
      document.getElementsByClassName("vscode")[0].classList.toggle("minimize");
      isMin(!min);
    }

    return (
      <>
        <TopBar title="Visual Studio Code" onDblClick={minimize}>
          <TopBarInteraction
            action="hide"
            onHide={() => dispatch(setHide(true))}
          />
          <TopBarInteraction action={min ? "max" : "min"} onMinMax={minimize} />
          <TopBarInteraction action="close" onClose={close} />
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
      </>
    );
  };

  return (
    <div className="VSCodeWindow">
      <div className="Window vscode" key={Math.random()}>
        <VSCodeWindow />
      </div>
    </div>
  );
}
