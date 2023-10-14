import Draggable from "react-draggable";
import TopBar from "./utils/window/TopBar";
import TopBarInteraction from "./utils/window/TopBarInteraction";
import WindowBody from "./utils/window/WindowBody";
import { useEffect, useState } from "react";
import { useScreenshot } from "@breezeos-dev/use-react-screenshot";
import "./Snapshot.scss";

export default function Snapshot() {
  const [image, takeScreenshot] = useScreenshot();
  const [introductionShown, setIntroductionShown] = useState<boolean>(false);
  const [isCaptured, setIsCaptured] = useState<boolean>(false);

  function captureScreenshot() {
    takeScreenshot(document.getElementById("Desktop") as HTMLDivElement);
    setIsCaptured(true);
    setTimeout(() => {
      setIsCaptured(false);
    }, 2000);
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
        <img className="SnapshotImage" src={image} />
      </div>
    </div>
  );
}
