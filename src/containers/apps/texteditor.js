import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActive, setHide } from "../../reducers/apps/texteditor";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBody from "../../components/utils/window/WindowBody";
import WindowBodyDefault from "../../components/utils/window/WindowBodyDefault";
import WindowBodyButton from "../../components/utils/window/WindowBodyButton";
import DockItem from "../../components/DockItem";
import "./assets/texteditor.scss";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import StartApp from "../../components/startMenu/StartApp";
import Sound1 from "../../sounds/Oxygen-Sys-App-Error-Critical.mp3";
import { setHeaderHide } from "../../reducers/header";
import { useTranslation } from "react-i18next";
import { setDesktopBodyActive } from "../../reducers/desktopbody";
import { setStartMenuActive } from "../../reducers/startmenu";
import Draggable from "react-draggable";

export const TextEditorApp = () => {
  const { t } = useTranslation();
  const isActive = useSelector((state) => state.appsTextEditor.active);
  const isHide = useSelector((state) => state.appsTextEditor.hide);
  const dispatch = useDispatch();
  const icon = useSelector((state) => state.appearance.iconTheme);

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.keyCode === 56) {
      dispatch(setActive(true));
    }
  });

  return (
    <DockItem
      id="texteditor"
      className={`TextEditorApp ${isActive && "clicked"} ${isHide && "hide"}`}
      title={t("apps.textEditor.name")}
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/text-editor.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-text-editor.svg"
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

export const TextEditorStartApp = () => {
  const { t } = useTranslation();
  const isHide = useSelector((state) => state.appsTextEditor.hide);
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
      key="texteditor"
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/text-editor.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-text-editor.svg"
      }
      name={t("apps.textEditor.name")}
      onClick={toggle}
    />
  );
};

export default function TextEditor() {
  const textAreaRef = useRef(null);
  const isActive = useSelector((state) => state.appsTextEditor.active);
  const isHide = useSelector((state) => state.appsTextEditor.hide);
  const [isUntouchable, setIsUntouchable] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [changes, saveChanges] = useState(true);
  const [min, isMin] = useState(false);
  const [msgboxChanges, displayMsgBoxChanges] = useState(false);
  const sound1 = new Audio(Sound1);

  useEffect(() => {
    if (isActive) {
      textAreaRef.current.focus();
    } else {
      textAreaRef.current.blur();
    }
  }, [isActive]);

  function saveChangesAndExit() {
    setIsUntouchable(false);
    saveChanges(true);
    displayMsgBoxChanges(false);
    dispatch(setActive(false));
  }

  function dontSaveChangesAndExit() {
    setIsUntouchable(false);
    saveChanges(false);
    displayMsgBoxChanges(false);
    dispatch(setActive(false));
  }

  function saveChangesBeforeExit() {
    displayMsgBoxChanges(true);
    setIsUntouchable(true);
    sound1.play();
  }

  useEffect(() => {
    textAreaRef.current.addEventListener("keydown", (e) => {
      saveChanges(false);

      if ((e.ctrlKey && e.keyCode === 115) || (e.ctrlKey && e.keyCode === 83)) {
        e.preventDefault();
        saveChanges(true);
      }
    });
  }, []);

  const SaveChanges = () => {
    return (
      <Draggable handle=".TopBar">
        <div
          className={`Window ${msgboxChanges && "active"}`}
          style={{ width: "420px", zIndex: 2 }}
          key={Math.random()}
        >
          <TopBar>
            <TopBarInteraction
              action="close"
              onClose={() => {
                displayMsgBoxChanges(false);
                setIsUntouchable(false);
              }}
            />
          </TopBar>
          <WindowBodyDefault
            type="question"
            title="Save changes for Untitled-1.txt and exit?"
          >
            <WindowBodyButton>
              <button
                className="Button"
                key={Math.random()}
                onClick={() => {
                  displayMsgBoxChanges(false);
                  setIsUntouchable(false);
                }}
              >
                Cancel
              </button>
              <button
                className="Button"
                key={Math.random()}
                onClick={dontSaveChangesAndExit}
              >
                No
              </button>
              <button
                className="Button"
                key={Math.random()}
                onClick={saveChangesAndExit}
              >
                Yes
              </button>
            </WindowBodyButton>
          </WindowBodyDefault>
        </div>
      </Draggable>
    );
  };

  return (
    <div className="TextEditorWindow">
      <SaveChanges />
      <Draggable handle=".TopBar">
        <div
          className={`Window texteditor ${isActive && "active"} ${
            isHide && "hide"
          } ${min && "minimize"} ${isUntouchable && "untouchable"}`}
        >
          <TopBar
            title={`${changes ? "" : "*"}Untitled-1.txt – ${t(
              "apps.textEditor.name"
            )}`}
            onDblClick={() => isMin(!min)}
          >
            <div className="TabBarWrapper">
              <div
                className="TabBar"
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                }}
              >
                <div className="TabBarItem">
                  <div className="TabBarInteraction">
                    <i className="fa-regular fa-gear" />
                  </div>
                  <div
                    className="TabBarInteraction"
                    style={{ marginLeft: "8px" }}
                  >
                    <i className="fa-regular fa-magnifying-glass" />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="TopBarInteractionWrapper"
              style={{ display: "flex" }}
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
                onClose={
                  changes === true
                    ? () => dispatch(setActive(false))
                    : saveChangesBeforeExit
                }
              />
            </div>
          </TopBar>
          <WindowBody>
            <div className="TextEditor">
              <textarea
                className="TextArea"
                spellCheck={false}
                ref={textAreaRef}
              />
            </div>
          </WindowBody>
        </div>
      </Draggable>
    </div>
  );
}
