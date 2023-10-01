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
import { setHeaderActive, setHeaderHide } from "../../reducers/header";

export const TextEditorApp = () => {
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
      title="Text Editor"
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/text-editor.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-text-editor.svg"
      }
      menu={[
        [
          {
            label: isHide ? "Unhide" : "Hide",
            disabled: isActive ? false : true,
            action: () =>
              isHide ? dispatch(setHide(false)) : dispatch(setHide(true)),
          },
          {
            label: isActive ? "Quit" : "Open",
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
  const isHide = useSelector((state) => state.appsTextEditor.hide);
  const dispatch = useDispatch();
  const icon = useSelector((state) => state.appearance.iconTheme);

  const toggle = () => {
    document
      .getElementsByClassName("StartMenuWrapper")[0]
      .classList.remove("active");
    dispatch(setHeaderHide(false));
    document.getElementsByClassName("DesktopBody")[0].classList.add("active");
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
      name="Text Editor"
      onClick={toggle}
    />
  );
};

export default function TextEditor() {
  const textEditorRef = useRef(null);
  const dispatch = useDispatch();

  const TextEditorWindow = () => {
    const [changes, saveChanges] = useState(true);
    const [min, isMin] = useState(false);
    const [msgboxChanges, displayMsgBoxChanges] = useState(false);
    const sound1 = new Audio(Sound1);

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
        <div className={`SaveChanges ${msgboxChanges ? "active" : ""}`}>
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
            <p className="WindowBodyContent">
              Save changes to hello.cpp and exit?
            </p>
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
        <TopBar
          title={`${changes ? "" : "*"}hello.cpp – Text Editor`}
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
                  <i className="fa-regular fa-bars" />
                </div>
                <div
                  className="TabBarInteraction"
                  style={{ marginLeft: "10px" }}
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
            <div className="TextLineNumber">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
            </div>
            <div className="Textarea" id="textarea">
              <div
                className="TextArea"
                contentEditable={true}
                spellCheck={false}
              >
                <span className="col1">#include</span>&nbsp;
                <span className="col2">&lt;iostream&gt;</span>
              </div>
              <div
                className="TextArea"
                contentEditable={true}
                spellCheck={false}
              ></div>
              <div
                className="TextArea"
                contentEditable={true}
                spellCheck={false}
              >
                <span className="col1 col1a">int</span>&nbsp;
                <span className="col2a">main</span>
                <span className="col3">&#40;&#41;&#123;</span>
              </div>
              <div
                className="TextArea"
                contentEditable={true}
                spellCheck={false}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="col4">// This is a comment</span>
              </div>
              <div
                className="TextArea"
                contentEditable={true}
                spellCheck={false}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="col4a">std</span>
                ::cout&nbsp;<span className="col4b">&lt;&lt;</span>&nbsp;
                <span className="col2">"Welcome to BreezeOS!"</span>&nbsp;
                <span className="col4b">&lt;&lt;</span>&nbsp;
                <span className="col4a">std</span>::endl;
              </div>
              <div
                className="TextArea"
                contentEditable={true}
                spellCheck={false}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="col1">return</span>
                &nbsp;<span className="col5">0</span>;
              </div>
              <div
                className="TextArea"
                contentEditable={true}
                spellCheck={false}
                style={{ height: "100%" }}
              >
                <span className="col3">&#125;</span>
              </div>
            </div>
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
