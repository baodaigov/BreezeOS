import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActive, setHide } from "../../reducers/apps/camera";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBody from "../../components/utils/window/WindowBody";
import DockItem from "../../components/DockItem";
import "./assets/camera.scss";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import StartApp from "../../components/startMenu/StartApp";
import Webcam from "react-webcam";
import ActMenu, { ActMenuSelector } from "../../components/utils/menu/index";
import CountdownSound from "../../sounds/mixkit-clock-countdown-bleeps-916_Bq9La32i.wav";
import CameraShutter from "../../sounds/camera_shutter.mp3";
import { setHeaderActive } from "../../reducers/header";

export const CameraApp = () => {
  const isActive = useSelector((state) => state.appsCamera.active);
  const isHide = useSelector((state) => state.appsCamera.hide);
  const dispatch = useDispatch();
  const icon = useSelector((state) => state.appearance.iconTheme);

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.keyCode === 53) {
      dispatch(setActive(true));
    }
  });

  useEffect(() => {
    if (isActive) {
      document.getElementsByClassName("CameraApp")[0].classList.add("clicked");
      setTimeout(
        () =>
          document.getElementsByClassName("camera")[0].classList.add("active"),
        500
      );
    } else {
      document
        .getElementsByClassName("CameraApp")[0]
        .classList.remove("clicked");
      document.getElementsByClassName("camera")[0].classList.remove("active");
    }
    if (isHide) {
      document.getElementsByClassName("CameraApp")[0].classList.add("hide");
      document.getElementsByClassName("camera")[0].classList.add("hide");
    } else {
      document.getElementsByClassName("CameraApp")[0].classList.remove("hide");
      document.getElementsByClassName("camera")[0].classList.remove("hide");
    }
  }, [isActive, isHide]);

  return (
    <DockItem
      id="camera"
      className="CameraApp"
      title="Camera"
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/cheese.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-camera.svg"
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

export const CameraStartApp = () => {
  const isHide = useSelector((state) => state.appsCamera.hide);
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
    }
  };

  return (
    <StartApp
      key="camera"
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/cheese.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-camera.svg"
      }
      name="Camera"
      onClick={toggle}
    />
  );
};

export default function Camera() {
  const dispatch = useDispatch();

  const CameraWindow = () => {
    const isActive = useSelector((state) => state.appsCamera.active);
    const [webcam, setWebcam] = useState(false);
    const [interaction, disableInteraction] = useState("capturing");
    const [img, setImg] = useState(null);
    const [audio, setAudio] = useState(false);
    var countdownSound = new Audio(CountdownSound);
    var cameraShutter = new Audio(CameraShutter);
    const videoConstraints = {
      facingMode: "user",
    };

    const [item, swapItem] = useState(false);

    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
      if (audio) {
        countdownSound.play();

        if (timeLeft < 1) {
          setTimeLeft(null);
          countdownSound.pause();
        }

        if (!timeLeft) return;

        const intervalId = setInterval(() => {
          countdownSound.play();
          setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
      } else {
        if (timeLeft < 1) setTimeLeft(null);

        if (!timeLeft) return;

        const intervalId = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
      }
    }, [timeLeft, audio]);

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [settingsMenu, showSettingsMenu] = useState(false);
    const [countdown, setCountdown] = useState(false);
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
      if (countdown) {
        if (audio) {
          disableInteraction("capturing");
          setTimeLeft(3);
          setTimeout(() => {
            document
              .getElementsByClassName("Desktop")[0]
              .classList.add("capture");
            cameraShutter.play();
            const imageSrc = webcamRef.current.getScreenshot();
            setImg(imageSrc);
            disableInteraction("");
            setTimeout(() => {
              document
                .getElementsByClassName("Desktop")[0]
                .classList.remove("capture");
            }, 1000);
          }, 3000);
        } else {
          disableInteraction("capturing");
          setTimeLeft(3);
          setTimeout(() => {
            document
              .getElementsByClassName("Desktop")[0]
              .classList.add("capture");
            const imageSrc = webcamRef.current.getScreenshot();
            setImg(imageSrc);
            disableInteraction("");
            setTimeout(() => {
              document
                .getElementsByClassName("Desktop")[0]
                .classList.remove("capture");
            }, 1000);
          }, 3000);
        }
      } else if (audio) {
        document.getElementsByClassName("Desktop")[0].classList.add("capture");
        cameraShutter.play();
        setTimeout(() => {
          document
            .getElementsByClassName("Desktop")[0]
            .classList.remove("capture");
        }, 1000);
        const imageSrc = webcamRef.current.getScreenshot();
        setImg(imageSrc);
      } else {
        document.getElementsByClassName("Desktop")[0].classList.add("capture");
        setTimeout(() => {
          document
            .getElementsByClassName("Desktop")[0]
            .classList.remove("capture");
        }, 1000);
        const imageSrc = webcamRef.current.getScreenshot();
        setImg(imageSrc);
      }
    }, [webcamRef, countdown, audio]);

    useEffect(() => {
      let interval;
      if (running === true) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 10);
        }, 10);
      } else if (running === false) {
        clearInterval(interval);
        setTime(0);
      }
      return () => clearInterval(interval);
    }, [running]);

    const [recording, isRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const handleDataAvailable = useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );

    const record = useCallback(() => {
      if (countdown) {
        disableInteraction("capturing");
        setTimeLeft(3);
        setTimeout(() => {
          setCapturing(true);
          mediaRecorderRef.current = new MediaRecorder(
            webcamRef.current.stream,
            {
              mimeType: "video/webm",
            }
          );
          mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
          );
          mediaRecorderRef.current.start();
          document
            .getElementsByClassName("CameraRecordTime")[0]
            .classList.add("active");
          isRecording(true);
          setRunning(true);
        }, 3000);
      } else {
        disableInteraction("capturing");
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
          mimeType: "video/webm",
        });
        mediaRecorderRef.current.addEventListener(
          "dataavailable",
          handleDataAvailable
        );
        mediaRecorderRef.current.start();
        document
          .getElementsByClassName("CameraRecordTime")[0]
          .classList.add("active");
        isRecording(true);
        setRunning(true);
      }
    }, [
      webcamRef,
      setCapturing,
      mediaRecorderRef,
      handleDataAvailable,
      countdown,
    ]);

    const stopRecord = useCallback(() => {
      mediaRecorderRef.current.stop();
      setCapturing(false);
      disableInteraction("");
      document
        .getElementsByClassName("CameraRecordTime")[0]
        .classList.remove("active");
      isRecording(false);
      setRunning(false);
      console.log(recordedChunks);
    }, [mediaRecorderRef, setCapturing]);

    const [viewMedia, setViewMedia] = useState(false);

    function displayCountdown() {
      showSettingsMenu(!settingsMenu);
      setCountdown(!countdown);
    }

    function toggleSounds() {
      showSettingsMenu(!settingsMenu);
      setAudio(!audio);
    }

    const [msgboxDelete, displayMsgboxDelete] = useState(false);
    const [imageInformationMsgbox, displayImageInformationMsgbox] =
      useState(false);

    function closeMsgBoxDelete() {
      displayMsgboxDelete(false);
      displayImageInformationMsgbox(false);
    }

    function deleteImage() {
      displayMsgboxDelete(false);
      setImg(null);
    }

    function useOutsideSettingsMenu(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            showSettingsMenu(false);
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
    }

    const settingsMenuRef = useRef(null);
    useOutsideSettingsMenu(settingsMenuRef);

    useEffect(() => {
      if (isActive) {
        setTimeout(() => {
          setWebcam(true);
          disableInteraction("");
        }, 1000);
      } else {
        setTimeout(() => {
          setWebcam(false);
          disableInteraction("capturing");
          document
            .getElementsByClassName("CameraRecordTime")[0]
            .classList.remove("active");
          isRecording(false);
          setRunning(false);
          showSettingsMenu(false);
          setViewMedia(false);
        }, 500);
      }
    }, [isActive]);

    const [min, isMin] = useState(false);

    function minimize() {
      document.getElementsByClassName("camera")[0].classList.toggle("minimize");
      isMin(!min);
    }

    return (
      <>
        <div
          className={`ImageInformation ${
            imageInformationMsgbox ? "active" : ""
          }`}
        >
          <div className="WindowTopBar">
            <div className="WindowTopBarInteractionContainer">
              <div
                className="WindowTopBarInteraction close"
                onClick={closeMsgBoxDelete}
              >
                <i className="fa-solid fa-xmark fa-lg"></i>
              </div>
            </div>
          </div>
          <div className="WindowBodyDefault">
            <div className="WindowBodyContent">
              <div style={{ display: "flex", flexDirection: "column" }}></div>
            </div>
          </div>
        </div>
        <div
          className={`PermanentlyDeleteMedia ${msgboxDelete ? "active" : ""}`}
        >
          <div className="WindowTopBar">
            <p className="WindowTopBarTitle">Delete this image?</p>
            <div className="WindowTopBarInteractionContainer">
              <div
                className="WindowTopBarInteraction close"
                onClick={closeMsgBoxDelete}
              >
                <i className="fa-solid fa-xmark fa-lg"></i>
              </div>
            </div>
          </div>
          <div className="WindowBodyDefault">
            <p className="WindowBodyContent">This action is irreversible!</p>
            <div className="WindowBodyButton">
              <button className="Button" onClick={closeMsgBoxDelete}>
                No
              </button>
              <button className="Button" onClick={deleteImage}>
                Yes
              </button>
            </div>
          </div>
        </div>
        <ActMenu
          style={{ zIndex: "1", top: "30px", right: "80px" }}
          className={settingsMenu ? "active" : ""}
          ref={settingsMenuRef}
        >
          {countdown ? (
            <ActMenuSelector
              title="Camera countdown"
              active
              onClick={displayCountdown}
            ></ActMenuSelector>
          ) : (
            <ActMenuSelector
              title="Camera countdown"
              onClick={displayCountdown}
            ></ActMenuSelector>
          )}
          {audio ? (
            <ActMenuSelector
              title="Enable sounds"
              active
              onClick={toggleSounds}
            ></ActMenuSelector>
          ) : (
            <ActMenuSelector
              title="Enable sounds"
              onClick={toggleSounds}
            ></ActMenuSelector>
          )}
        </ActMenu>
        <TopBar title="Camera" onDblClick={minimize}>
          <div className="TabBarWrapper" style={{ width: "100%" }}>
            <div className="TabBar" style={{ display: "block" }}>
              <div className="TabBarItem" style={{ float: "right" }}>
                <div className="TabBarInteraction">
                  <i
                    className="fa-regular fa-gear"
                    onClick={() => showSettingsMenu(!settingsMenu)}
                  ></i>
                </div>
              </div>
            </div>
          </div>
          <TopBarInteraction
            action="hide"
            onHide={() => dispatch(setHide(true))}
          />
          <TopBarInteraction action={min ? "max" : "min"} onMinMax={minimize} />
          <TopBarInteraction
            action="close"
            onClose={() => dispatch(setActive(false))}
          />
        </TopBar>
        <WindowBody>
          <div className={`Camera ${viewMedia ? "blankscr" : ""}`}>
            {viewMedia ? (
              <div className="CameraViewMedia">
                {img != null ? (
                  <>
                    <div className="CameraMediaImg">
                      <img src={img} alt="screenshot" />
                    </div>
                  </>
                ) : (
                  <div className="NoMedia">
                    <p className="NoMedia">Nothing to show</p>
                  </div>
                )}
                <div className="CameraViewInteraction">
                  <div
                    className="GoBackBtn"
                    onClick={() => setViewMedia(!viewMedia)}
                  >
                    <i className="fa-regular fa-arrow-left"></i>
                  </div>
                  {img != null ? (
                    <div style={{ display: "flex" }}>
                      <a href={img} download={`Picture_${Date.now()}`}>
                        <div className="CameraButton">
                          <p>Save image</p>
                        </div>
                      </a>
                      <div
                        className="CameraButton"
                        onClick={() => displayMsgboxDelete(true)}
                        onDoubleClick={deleteImage}
                      >
                        <p>Delete</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="CameraVideo">
              <div className="CameraRecordTime">
                <p>
                  <span>
                    {("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:
                  </span>
                  <span>
                    {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                  </span>
                  <span>
                    {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                  </span>
                </p>
              </div>
              <div className="CameraTimer">
                <p>{timeLeft}</p>
              </div>
              {webcam ? (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  imageSmoothing={true}
                  mirrored={true}
                />
              ) : (
                <div className="WebcamDisabled">
                  <i className="fa-regular fa-camera-slash disableWebcam"></i>
                </div>
              )}
              <div className={`CameraInteraction ${interaction}`}>
                <div className="CameraAct" onClick={() => swapItem(!item)}>
                  <i
                    className={`fa-light ${item ? "fa-camera" : "fa-video"}`}
                  ></i>
                </div>
                {item ? (
                  <div
                    className={`CameraCapture ${
                      recording ? "isRecording" : ""
                    }`}
                    onClick={recording ? stopRecord : record}
                  >
                    {recording ? (
                      <i className="fa-solid fa-square"></i>
                    ) : (
                      <i className="fa-light fa-video"></i>
                    )}
                  </div>
                ) : (
                  <div className="CameraCapture" onClick={capture}>
                    <i className="fa-light fa-camera"></i>
                  </div>
                )}
                <div
                  className="CameraCapturedImg"
                  onClick={() => setViewMedia(!viewMedia)}
                >
                  {img != null ? <img src={img} alt="screenshot" /> : ""}
                </div>
              </div>
            </div>
          </div>
        </WindowBody>
      </>
    );
  };

  return (
    <div className="CameraWindow">
      <div className="Window camera" key={Math.random()}>
        <CameraWindow />
      </div>
    </div>
  );
}
