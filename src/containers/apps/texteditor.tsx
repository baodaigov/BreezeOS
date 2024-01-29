import { useEffect, useRef, useState } from "react";
import "@/components/utils/window/Window.scss";
import TopBar from "@/components/utils/window/TopBar";
import WindowBody from "@/components/utils/window/WindowBody";
import "./assets/texteditor.scss";
import TopBarInteraction from "@/components/utils/window/TopBarInteraction";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBlocks } from "@/store/reducers/msgbox";
import {
  closeApp,
  enterFullScreen,
  hideApp,
  maximizeApp,
  minimizeApp,
} from "@/store/reducers/apps";

export default function TextEditor({ id }: { id: string }) {
  const appIsActive = useAppSelector((state) => state.apps.appIsActive);
  const fullscreen = useAppSelector((state) => state.apps.fullscreen);
  const isActive = appIsActive[id].status === "active";
  const isHide = appIsActive[id].status === "hide";
  const isMinimized = appIsActive[id].minimized;
  const isFullScreen = fullscreen === id;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isUntouchable, setIsUntouchable] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [changes, saveChanges] = useState<boolean>(true);
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
    dispatch(closeApp(id));
  }

  function dontSaveChangesAndExit() {
    setIsUntouchable(false);
    saveChanges(false);
    dispatch(closeApp(id));
  }

  function saveChangesBeforeExit() {
    dispatch(
      setBlocks([
        ...blocks,
        {
          type: "question",
          title: "Save changes for Untited-1.txt and exit?",
          buttons: [
            {
              label: "Yes",
              action: saveChangesAndExit,
            },
            {
              label: "No",
              action: dontSaveChangesAndExit,
            },
            {
              label: "Cancel",
            },
          ],
          width: "450px",
        },
      ])
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
      <Draggable handle="#TopBar">
        <div
          className={`Window texteditor ${isActive && "active"} ${
            isHide && "hide"
          } ${isMinimized && "minimize"} ${isFullScreen && "fullscreen"} ${
            isUntouchable && "untouchable"
          }`}
        >
          <TopBar
            title={`${changes ? "" : "*"}${location && `${location} – `}${t(
              `apps.${id}.name`
            )}`}
            onDblClick={() =>
              isMinimized
                ? dispatch(maximizeApp(id))
                : dispatch(minimizeApp(id))
            }
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
                onClose={
                  changes === true
                    ? () => dispatch(closeApp(id))
                    : saveChangesBeforeExit
                }
              />
            </div>
          </TopBar>
          <WindowBody>
            <div className="TextEditor">
              {isFullScreen && (
                <div className="TopBar">
                  <div className="TopBarInteractionContainer">
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
                  </div>
                </div>
              )}
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
