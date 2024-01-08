import { useEffect, useRef, useState } from "react";
import { setActive, setHide } from "@/store/reducers/apps/texteditor";
import "@/components/utils/window/Window.scss";
import TopBar from "@/components/utils/window/TopBar";
import WindowBody from "@/components/utils/window/WindowBody";
import DockItem from "@/components/dock/DockItem";
import "./assets/texteditor.scss";
import TopBarInteraction from "@/components/utils/window/TopBarInteraction";
import StartApp from "@/components/startMenu/StartApp";
import { setHeaderHide } from "@/store/reducers/header";
import { useTranslation } from "react-i18next";
import { setDesktopBodyActive } from "@/store/reducers/desktopbody";
import { setStartMenuActive } from "@/store/reducers/startmenu";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBlocks } from '@/store/reducers/msgbox';

export const TextEditorApp = () => {
  const { t } = useTranslation();
  const isActive = useAppSelector((state) => state.appsTextEditor.active);
  const isHide = useAppSelector((state) => state.appsTextEditor.hide);
  const dispatch = useAppDispatch();
  const icon = useAppSelector((state) => state.appearance.iconTheme);

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
  const isHide = useAppSelector((state) => state.appsTextEditor.hide);
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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const isActive = useAppSelector((state) => state.appsTextEditor.active);
  const isHide = useAppSelector((state) => state.appsTextEditor.hide);
  const [isUntouchable, setIsUntouchable] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [changes, saveChanges] = useState<boolean>(true);
  const [min, isMin] = useState<boolean>(false);
  const blocks = useAppSelector((state) => state.msgbox.blocks);

  useEffect(() => {
    if (isActive) {
      textAreaRef.current?.focus();
    } else {
      textAreaRef.current?.blur();
    }
  }, [isActive]);

  function saveChangesAndExit() {
    setIsUntouchable(false);
    saveChanges(true);
    dispatch(setActive(false));
  }

  function dontSaveChangesAndExit() {
    setIsUntouchable(false);
    saveChanges(false);
    dispatch(setActive(false));
  }

  function saveChangesBeforeExit() {
    dispatch(
      setBlocks([
        ...blocks,
        {
          type: 'question',
          title: "Save changes for Untited-1.txt and exit?",
          buttons: [
            {
              label: 'Yes',
              action: saveChangesAndExit,
            },
            {
              label: 'No',
              action: dontSaveChangesAndExit,
            },
            {
              label: 'Cancel'
            },
          ],
          width: "450px"
        },
      ]),
    );
  }

  useEffect(() => {
    textAreaRef.current?.addEventListener("input", () => saveChanges(false));
    textAreaRef.current?.addEventListener("keydown", (e) => {
      if ((e.ctrlKey && e.keyCode === 115) || (e.ctrlKey && e.keyCode === 83)) {
        e.preventDefault();
        saveChanges(true);
      }
    });
  }, []);

  return (
    <div className="TextEditorWindow">
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
