import Draggable from "react-draggable";
import TopBar from "./utils/window/TopBar";
import TopBarInteraction from "./utils/window/TopBarInteraction";
import WindowBody from "./utils/window/WindowBody";
import { useEffect, useState } from "react";
import { useScreenshot } from "@breezeos-dev/use-react-screenshot";
import "./Snapshot.scss";
import FileSaver from "file-saver";
import Checkbox from "./utils/checkbox/Checkbox";

export default function Snapshot() {
  const [image, takeScreenshot] = useScreenshot();
  const [introductionShown, setIntroductionShown] = useState<boolean>(false);
  const [isCaptured, setIsCaptured] = useState<boolean>(false);
  const [saveOptionsDisplayed, setSaveOptionsDisplayed] =
    useState<boolean>(false);
  const [neverDisplaySaveOptions, setNeverDisplaySaveOptions] =
    useState<boolean>(false);

  function captureScreenshot() {
    takeScreenshot(document.getElementById("Desktop") as HTMLDivElement);
    setIsCaptured(true);
    setTimeout(() => {
      if (!localStorage.getItem("snapshotSaveOptionsDisabled")) {
        setSaveOptionsDisplayed(true);
      } else {
        if (localStorage.getItem("snapshotSaveOption") === "yes") {
          setTimeout(saveImage, 500);
        } else {
          dontSaveImage();
        }
      }
    }, 2000);
  }

  function dontSaveImage() {
    setSaveOptionsDisplayed(false);
    setIsCaptured(false);
  }

  function saveImage() {
    setSaveOptionsDisplayed(false);
    setIsCaptured(false);
    FileSaver.saveAs(`${image}`, "image.jpg");
  }

  function disableSnapshotIntroduction() {
    setIntroductionShown(false);
    localStorage.setItem("snapshotIntroDisabled", "true");
    setTimeout(captureScreenshot, 300);
  }

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && e.keyCode === 80) {
        if (!localStorage.getItem("snapshotIntroDisabled")) {
          setIntroductionShown(true);
        } else captureScreenshot();
      }
    });
  }, []);

  return (
    <div className={`Snapshot ${isCaptured && "captured"}`}>
      <Draggable handle=".TopBar">
        <div
          className={`Window ${introductionShown && "active"}`}
          style={{
            width: "800px",
            height: "450px",
          }}
        >
          <TopBar title="Welcome to Snapshot">
            <TopBarInteraction
              action="close"
              onClose={disableSnapshotIntroduction}
            />
          </TopBar>
          <WindowBody>
            <div className="SnapshotIntroduction">
              <p className="Head">Welcome to Snapshot</p>
              <p className="Desc">
                Snapshot is a built-in application that captures screenshot of
                the desktop.
                <br />
                <br />
                Sometimes you will get lag experience when capturing screenshot,
                or getting a blank screenshot as this is still in development.
                The community will keep improving this application to give a
                fulfilling experience.
              </p>
              <div className="Button" onClick={disableSnapshotIntroduction}>
                Continue
              </div>
            </div>
          </WindowBody>
        </div>
      </Draggable>
      <div className="SnapshotImageWrapper">
        <img
          className={`SnapshotImage ${saveOptionsDisplayed && "flow"}`}
          src={image}
        />
        <div className={`SaveOptions ${saveOptionsDisplayed && "active"}`}>
          <p style={{ fontSize: "14px" }}>
            Save this image as "image.jpg" in your main device?
          </p>
          <div className="ButtonContainer">
            <div
              className="Button cancel"
              onClick={() => {
                setSaveOptionsDisplayed(false);
                setIsCaptured(false);
                if (neverDisplaySaveOptions) {
                  localStorage.setItem("snapshotSaveOptionsDisabled", "true");
                  localStorage.setItem("snapshotSaveOption", "no");
                }
              }}
            >
              No
            </div>
            <div
              className="Button"
              onClick={() => {
                setSaveOptionsDisplayed(false);
                setIsCaptured(false);
                FileSaver.saveAs(`${image}`, "image.jpg");
                if (neverDisplaySaveOptions) {
                  localStorage.setItem("snapshotSaveOptionsDisabled", "true");
                  localStorage.setItem("snapshotSaveOption", "yes");
                }
              }}
            >
              Yes
            </div>
          </div>
          <div className="CheckContainer">
            <Checkbox
              active={neverDisplaySaveOptions}
              onToggle={() =>
                setNeverDisplaySaveOptions(!neverDisplaySaveOptions)
              }
            />
            <p className="Text">Never display this again</p>
          </div>
        </div>
      </div>
    </div>
  );
}
