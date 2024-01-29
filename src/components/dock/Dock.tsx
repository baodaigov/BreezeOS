import "./Dock.scss";
import DockItem from "./DockItem";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import { hideApp, openApp, showApp } from "@/store/reducers/apps";
import { useEffect, useState } from "react";

export default function Dock(){
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const shellTheme = useAppSelector((state) => state.shell.theme);
  const dockActive = useAppSelector((state) => state.dock.active);
  const dockHide = useAppSelector((state) => state.dock.hide);
  const favorites = useAppSelector((state) => state.dock.favorites);
  const appIsActive = useAppSelector((state) => state.apps.appIsActive);
  const fullscreen = useAppSelector((state) => state.apps.fullscreen);
  const [floating, setFloating] = useState<boolean>(false);

  useEffect(() => {
    if (fullscreen) {
      setFloating(false);
    } else {
      setFloating(true);
    }
  }, [fullscreen]);

  let enterMouse: number;

  function mouseLeave() {
    if (enterMouse) window.clearTimeout(enterMouse);
    setFloating(false);
  }

  function mouseEnter() {
    enterMouse = window.setTimeout(() => setFloating(true), 500);
  }

  return fullscreen ? (
    <div
      className="DockContainer"
      style={{
        bottom: floating ? "0" : "-48px",
        pointerEvents: "auto",
      }}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div
        className={`Dock ${shellTheme === "WhiteSur" ? "whitesur" : ""}`}
        style={{
          pointerEvents: floating ? "auto" : "none",
        }}
      >
        {favorites.map((i) =>
          appIsActive[i.id] ? (
            appIsActive[i.id].status === "active" ? (
              <DockItem
                title={t(`apps.${i.id}.name`)}
                icon={i.icon}
                id={i.id}
                onClick={() => dispatch(hideApp(i.id))}
              />
            ) : (
              <DockItem
                title={t(`apps.${i.id}.name`)}
                icon={i.icon}
                id={i.id}
                onClick={() => dispatch(showApp(i.id))}
              />
            )
          ) : (
            <DockItem
              title={t(`apps.${i.id}.name`)}
              icon={i.icon}
              id={i.id}
              onClick={() =>
                !i.externalLink
                  ? dispatch(openApp(i.id))
                  : window.open(i.externalLink, "_blank")
              }
            />
          ),
        )}
      </div>
    </div>
  ) : (
    <div
      className={`DockContainer ${dockActive && "active"} ${
        dockHide && "hide"
      }`}
    >
      <div className={`Dock ${shellTheme === "WhiteSur" ? "whitesur" : ""}`}>
        {favorites.map((i) =>
          appIsActive[i.id] ? (
            appIsActive[i.id].status === "active" ? (
              <DockItem
                title={t(`apps.${i.id}.name`)}
                icon={i.icon}
                id={i.id}
                onClick={() => dispatch(hideApp(i.id))}
              />
            ) : (
              <DockItem
                title={t(`apps.${i.id}.name`)}
                icon={i.icon}
                id={i.id}
                onClick={() => dispatch(showApp(i.id))}
              />
            )
          ) : (
            <DockItem
              title={t(`apps.${i.id}.name`)}
              icon={i.icon}
              id={i.id}
              onClick={() =>
                !i.externalLink
                  ? dispatch(openApp(i.id))
                  : window.open(i.externalLink, "_blank")
              }
            />
          ),
        )}
      </div>
    </div>
  );
};
