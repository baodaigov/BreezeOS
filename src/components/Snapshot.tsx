import Draggable from "react-draggable";
import TopBar from "./utils/window/TopBar";
import TopBarInteraction from "./utils/window/TopBarInteraction";
import WindowBody from "./utils/window/WindowBody";
import { useEffect, useState } from "react";
import { useScreenshot } from "@breezeos-dev/use-react-screenshot";
import "./Snapshot.scss";
import FileSaver from "file-saver";
import Checkbox from "./utils/checkbox";
import { BaseDirectory, writeBinaryFile } from "@tauri-apps/api/fs";
import { useDispatch } from "react-redux";
import { setModalContent } from "@/store/reducers/modal";
import { register } from "@tauri-apps/api/globalShortcut";

export default function Snapshot() {
  const dispatch = useDispatch();
  const [image, takeScreenshot] = useScreenshot();
  const [introductionShown, setIntroductionShown] = useState<boolean>(false);
  const [isCaptured, setIsCaptured] = useState<boolean>(false);
  const [saveOptionsDisplayed, setSaveOptionsDisplayed] =
    useState<boolean>(false);
  const [neverDisplaySaveOptions, setNeverDisplaySaveOptions] =
    useState<boolean>(false);
  const [screenshotTime, setScreenshotTime] = useState<number | null>(null);

  function captureScreenshot() {
    takeScreenshot(document.getElementById("Desktop") as HTMLDivElement);
    setScreenshotTime(Date.now());
    setIsCaptured(true);
    if (!localStorage.getItem("snapshotSaveOptionsDisabled")) {
      setTimeout(() => setSaveOptionsDisplayed(true), 2500);
    } else
      localStorage.getItem("snapshotSaveOption") === "yes"
        ? setTimeout(saveImage, 2500)
        : setTimeout(dontSaveImage, 2500);
  }

  function dontSaveImage() {
    setSaveOptionsDisplayed(false);
    setIsCaptured(false);
    setScreenshotTime(null);
  }

  function base64ToBinary(data: string) {
    const fixedData = data.replace(/^data:image\/\w+;base64,/, "");
    const binaryString = atob(fixedData);

    const length = binaryString.length;
    const binaryArray = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      binaryArray[i] = binaryString.charCodeAt(i);
    }

    return binaryArray;
  }

  async function saveImage() {
    if (window.__TAURI_METADATA__) {
      try {
        await writeBinaryFile(
          `Screenshot-${screenshotTime}.png`,
          base64ToBinary(image!),
          {
            dir: BaseDirectory.Picture,
          }
        );
        dispatch(setModalContent("Successfully saved image"));
      } catch (e) {
        dispatch(setModalContent("Cannot save image due to unexpected error"));
        console.error(e);
      }
    } else {
      FileSaver.saveAs(`${image}`, `Screenshot-${screenshotTime}.png`);
    }
    setSaveOptionsDisplayed(false);
    setIsCaptured(false);
    setScreenshotTime(null);
  }

  function disableSnapshotIntroduction() {
    setIntroductionShown(false);
    localStorage.setItem("snapshotIntroDisabled", "true");
    setTimeout(captureScreenshot, 300);
  }

  async function captureScreenshotKeydown() {
    if (window.__TAURI_METADATA__) {
      await register("CommandOrControl+Shift+P", () => {
        if (!localStorage.getItem("snapshotIntroDisabled")) {
          setIntroductionShown(true);
        } else captureScreenshot();
      });
    } else {
      document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.shiftKey && e.keyCode === 80) {
          if (!localStorage.getItem("snapshotIntroDisabled")) {
            setIntroductionShown(true);
          } else captureScreenshot();
        }
      });
    }
  }

  useEffect(() => {
    captureScreenshotKeydown();
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
                or get a blank screenshot instead as this is still in
                development. The community will keep improving this application
                to give a fulfilling experience.
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
            Save this image as "Screenshot-{screenshotTime}.png" to your main
            device?
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
                saveImage();
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
            <p className="Text">Never ask this again</p>
          </div>
        </div>
      </div>
    </div>
  );
}
