import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActive, setHide } from "../../reducers/apps/texteditor";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBody from "../../components/utils/window/WindowBody";
import DockItem from "../../components/DockItem";
import "./assets/texteditor.scss";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import StartApp from "../../components/startMenu/StartApp";
import Sound1 from "../../sounds/Oxygen-Sys-App-Error-Critical.mp3";
import { setHeaderHide } from "../../reducers/header";
import { useTranslation } from "react-i18next";
import { setDesktopBodyActive } from "../../reducers/desktopbody";

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

  useEffect(() => {
    if (isActive) {
      document
        .getElementsByClassName("TextEditorApp")[0]
        .classList.add("clicked");
      setTimeout(
        () =>
          document
            .getElementsByClassName("texteditor")[0]
            .classList.add("active"),
        500
      );
    } else {
      document
        .getElementsByClassName("TextEditorApp")[0]
        .classList.remove("clicked");
      document
        .getElementsByClassName("texteditor")[0]
        .classList.remove("active");
    }
    if (isHide) {
      document.getElementsByClassName("TextEditorApp")[0].classList.add("hide");
      document.getElementsByClassName("texteditor")[0].classList.add("hide");
    } else {
      document
        .getElementsByClassName("TextEditorApp")[0]
        .classList.remove("hide");
      document.getElementsByClassName("texteditor")[0].classList.remove("hide");
    }
  }, [isActive, isHide]);

  return (
    <DockItem
      id="texteditor"
      className="TextEditorApp"
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
    document
      .getElementsByClassName("StartMenuWrapper")[0]
      .classList.remove("active");
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
  const textEditorRef = useRef(null);
  const dispatch = useDispatch();

  const TextEditorWindow = () => {
    const { t } = useTranslation();
    const [changes, saveChanges] = useState(true);
    const isActive = useSelector((state) => state.appsTextEditor.active);
    const [min, isMin] = useState(false);
    const [msgboxChanges, displayMsgBoxChanges] = useState(false);
    const sound1 = new Audio(Sound1);
    const textAreaRef = useRef(null);

    useEffect(() => {
      if (isActive) {
        textAreaRef.current.focus();
      } else {
        textAreaRef.current.blur();
      }
    }, [isActive]);

    function minimize() {
      document
        .getElementsByClassName("texteditor")[0]
        .classList.toggle("minimize");
      isMin(!min);
    }

    function saveChangesAndExit() {
      saveChanges(true);
      displayMsgBoxChanges(false);
      dispatch(setActive(false));
    }

    function dontSaveChangesAndExit() {
      saveChanges(false);
      displayMsgBoxChanges(false);
      dispatch(setActive(false));
    }

    function saveChangesBeforeExit() {
      displayMsgBoxChanges(true);
      sound1.play();
    }

    useEffect(() => {
      textEditorRef.current.addEventListener("input", (e) => {
        saveChanges(false);

        if (
          (e.ctrlKey && e.keyCode === 115) ||
          (e.ctrlKey && e.keyCode === 83)
        ) {
          e.preventDefault();
          saveChanges(true);
        }
      });
    }, []);

    return (
      <>
        <div className={`SaveChangesWrapper ${msgboxChanges ? "active" : ""}`}>
          <div className="SaveChanges">
            <div className="WindowTopBar">
              <p className="WindowTopBarTitle">Save & Exit</p>
              <div className="WindowTopBarInteractionContainer">
                <div
                  className="WindowTopBarInteraction close"
                  onClick={() => displayMsgBoxChanges(false)}
                >
                  <i className="fa-solid fa-xmark fa-lg" />
                </div>
              </div>
            </div>
            <div className="WindowBodyDefault">
              <div style={{ display: "flex" }}>
                <img
                  className="WindowBodyIcon"
                  src="https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/master/src/32/status/dialog-question.svg"
                />
                <div className="WindowBodyRight">
                  <p className="WindowBodyTitle">
                    Save changes to Untitled-1.txt and exit?
                  </p>
                </div>
              </div>
              <div className="WindowBodyButton">
                <button
                  className="Button"
                  onClick={() => displayMsgBoxChanges(false)}
                >
                  Cancel
                </button>
                <button className="Button" onClick={dontSaveChangesAndExit}>
                  No
                </button>
                <button className="Button" onClick={saveChangesAndExit}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
        <TopBar
          title={`${changes ? "" : "*"}Untitled-1.txt – ${t(
            "apps.textEditor.name"
          )}`}
          onDblClick={minimize}
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
          <div className="TopBarInteractionWrapper" style={{ display: "flex" }}>
            <TopBarInteraction
              action="hide"
              onHide={() => dispatch(setHide(true))}
            />
            <TopBarInteraction
              action={min ? "max" : "min"}
              onMinMax={minimize}
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
      </>
    );
  };

  return (
    <div className="TextEditorWindow">
      <div
        className="Window texteditor"
        ref={textEditorRef}
        key={Math.random()}
      >
        <TextEditorWindow />
      </div>
    </div>
  );
}
