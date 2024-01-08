import React, { useEffect, useState, useRef, useCallback } from "react";
import { setActive, setHide } from "../../store/reducers/apps/camera";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBody from "../../components/utils/window/WindowBody";
import DockItem from "../../components/dock/DockItem";
import "./assets/camera.scss";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import StartApp from "../../components/startMenu/StartApp";
import Webcam from "react-webcam";
import ActMenu, { ActMenuSelector } from "../../components/utils/menu/index";
import CountdownSound from "../../sounds/mixkit-clock-countdown-bleeps-916_Bq9La32i.wav";
import CameraShutter from "../../sounds/camera_shutter.mp3";
import { setHeaderHide } from "../../store/reducers/header";
import { useTranslation } from "react-i18next";
import { setDesktopBodyActive } from "@/store/reducers/desktopbody";
import { setStartMenuActive } from "@/store/reducers/startmenu";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBlocks } from '../../store/reducers/msgbox';

export const CameraApp = () => {
  const { t } = useTranslation();
  const isActive = useAppSelector((state) => state.appsCamera.active);
  const isHide = useAppSelector((state) => state.appsCamera.hide);
  const dispatch = useAppDispatch();
  const icon = useAppSelector((state) => state.appearance.iconTheme);

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.keyCode === 53) {
      dispatch(setActive(true));
    }
  });

  return (
    <DockItem
      id="camera"
      className={`CameraApp ${isActive && "clicked"} ${isHide && "hide"}`}
      title={t("apps.camera.name")}
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/cheese.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-camera.svg"
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

export const CameraStartApp = () => {
  const { t } = useTranslation();
  const isHide = useAppSelector((state) => state.appsCamera.hide);
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
      key="camera"
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/cheese.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-camera.svg"
      }
      name={t("apps.camera.name")}
      onClick={toggle}
    />
  );
};export default function Camera() {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((state) => state.appsCamera.active);
  const isHide = useAppSelector((state) => state.appsCamera.hide);
  const { t } = useTranslation();
  const [webcam, setWebcam] = useState<boolean>(false);
  const [interaction, disableInteraction] = useState<'' | 'capturing'>(
    'capturing',
  );
  const [img, setImg] = useState<string | null | undefined>(null);
  const [audio, setAudio] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);
  var countdownSound = new Audio(CountdownSound);
  var cameraShutter = new Audio(CameraShutter);
  const videoConstraints = {
    facingMode: 'user',
  };

  const [item, swapItem] = useState<boolean>(false);

  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (audio) {
      countdownSound.play();

      if (timeLeft && timeLeft < 1) {
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
      if (timeLeft && timeLeft < 1) setTimeLeft(null);

      if (!timeLeft) return;

      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timeLeft, audio]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [settingsMenu, showSettingsMenu] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    if (countdown) {
      if (audio) {
        disableInteraction('capturing');
        setTimeLeft(3);
        setTimeout(() => {
          document
            .getElementsByClassName('Desktop')[0]
            .classList.add('capture');
          cameraShutter.play();
          const imageSrc = webcamRef.current?.getScreenshot();
          setImg(imageSrc);
          disableInteraction('');
          setTimeout(() => {
            document
              .getElementsByClassName('Desktop')[0]
              .classList.remove('capture');
          }, 1000);
        }, 3000);
      } else {
        disableInteraction('capturing');
        setTimeLeft(3);
        setTimeout(() => {
          document
            .getElementsByClassName('Desktop')[0]
            .classList.add('capture');
          const imageSrc = webcamRef.current?.getScreenshot();
          setImg(imageSrc);
          disableInteraction('');
          setTimeout(() => {
            document
              .getElementsByClassName('Desktop')[0]
              .classList.remove('capture');
          }, 1000);
        }, 3000);
      }
    } else if (audio) {
      document.getElementsByClassName('Desktop')[0].classList.add('capture');
      cameraShutter.play();
      setTimeout(() => {
        document
          .getElementsByClassName('Desktop')[0]
          .classList.remove('capture');
      }, 1000);
      const imageSrc = webcamRef.current?.getScreenshot();
      setImg(imageSrc);
    } else {
      document.getElementsByClassName('Desktop')[0].classList.add('capture');
      setTimeout(() => {
        document
          .getElementsByClassName('Desktop')[0]
          .classList.remove('capture');
      }, 1000);
      const imageSrc = webcamRef.current?.getScreenshot();
      setImg(imageSrc);
    }
  }, [webcamRef, countdown, audio]);

  useEffect(() => {
    let interval: any;
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

  const mediaRecorderRef = useRef<any>(null);
  const [capturing, setCapturing] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleDataAvailable = useCallback(
    ({ data }: { data: any }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks],
  );

  const record = useCallback(() => {
    if (countdown) {
      disableInteraction('capturing');
      setTimeLeft(3);
      setTimeout(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(
          webcamRef.current?.stream!,
          {
            mimeType: 'video/webm',
          },
        );
        mediaRecorderRef.current.addEventListener(
          'dataavailable',
          handleDataAvailable,
        );
        mediaRecorderRef.current.start();
        document
          .getElementsByClassName('CameraRecordTime')[0]
          .classList.add('active');
        setRunning(true);
      }, 3000);
    } else {
      disableInteraction('capturing');
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current?.stream!, {
        mimeType: 'video/webm',
      });
      mediaRecorderRef.current.addEventListener(
        'dataavailable',
        handleDataAvailable,
      );
      mediaRecorderRef.current.start();
      document
        .getElementsByClassName('CameraRecordTime')[0]
        .classList.add('active');
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
    disableInteraction('');
    document
      .getElementsByClassName('CameraRecordTime')[0]
      .classList.remove('active');
    setRunning(false);
    console.log(recordedChunks);
  }, [mediaRecorderRef, setCapturing]);

  const [viewMedia, setViewMedia] = useState(false);
  const [imageInformationMsgbox, displayImageInformationMsgbox] =
    useState(false);

  function closeMsgBoxDelete() {
    displayImageInformationMsgbox(false);
    setIsUntouchable(false);
  }

  function deleteImage() {
    setImg(null);
    setIsUntouchable(false);
  }

  function useOutsideSettingsMenu(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showSettingsMenu(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const settingsMenuRef = useRef(null);
  useOutsideSettingsMenu(settingsMenuRef);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setWebcam(true);
        disableInteraction('');
      }, 300);
    } else {
      setTimeout(() => {
        setWebcam(false);
        disableInteraction('capturing');
        document
          .getElementsByClassName('CameraRecordTime')[0]
          .classList.remove('active');
        setRunning(false);
        showSettingsMenu(false);
        setViewMedia(false);
      }, 500);
    }
  }, [isActive]);

  const [min, isMin] = useState(false);
  const [isUntouchable, setIsUntouchable] = useState(false);
  const blocks = useAppSelector((state) => state.msgbox.blocks);

  return (
    <div className="CameraWindow">
      <Draggable handle=".TopBar">
        <div
          className={`Window camera ${isActive && 'active'} ${
            isHide && 'hide'
          } ${min && 'minimize'} ${isUntouchable && 'untouchable'}`}
        >
          <div
            className={`ImageInformationWrapper ${
              imageInformationMsgbox ? 'active' : ''
            }`}
          >
            <div className="ImageInformation">
              <div className="WindowTopBar">
                <p className="WindowTopBarTitle">Image information</p>
                <div className="WindowTopBarInteractionContainer">
                  <div
                    className="WindowTopBarInteraction close"
                    onClick={closeMsgBoxDelete}
                  >
                    <i className="fa-solid fa-xmark fa-lg" />
                  </div>
                </div>
              </div>
              <div className="WindowBodyDefault">
                <div className="WindowBodyContent">
                  <p className="ImageTitle">Picture_{Date.now()}.jpeg</p>
                  <p>
                    Intrinsic size: {imageRef.current?.naturalWidth} ×{' '}
                    {imageRef.current?.naturalHeight}px
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ActMenu
            style={{ zIndex: '1', top: '30px', right: '80px' }}
            className={settingsMenu ? 'active' : ''}
            ref={settingsMenuRef}
          >
            <ActMenuSelector
              onClose={() => showSettingsMenu(false)}
              title="Camera countdown"
              active={countdown}
              onClick={() => setCountdown(!countdown)}
            />
            <ActMenuSelector
              onClose={() => showSettingsMenu(false)}
              title="Enable sounds"
              active={audio}
              onClick={() => setAudio(!audio)}
            />
          </ActMenu>
          <TopBar title={t('apps.camera.name')} onDblClick={() => isMin(!min)}>
            <div className="TabBarWrapper">
              <div className="TabBar" style={{ display: 'block' }}>
                <div className="TabBarItem" style={{ float: 'right' }}>
                  {viewMedia && img != null && (
                    <div className="TabBarInteraction">
                      <i
                        className="fa-regular fa-circle-info"
                        onClick={() => displayImageInformationMsgbox(true)}
                      />
                    </div>
                  )}
                  <div className="TabBarInteraction">
                    <i
                      className="fa-regular fa-gear"
                      onClick={() => showSettingsMenu(!settingsMenu)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <TopBarInteraction
              action="hide"
              onHide={() => dispatch(setHide(true))}
            />
            <TopBarInteraction
              action={min ? 'max' : 'min'}
              onMinMax={() => isMin(!min)}
            />
            <TopBarInteraction
              action="close"
              onClose={() => dispatch(setActive(false))}
            />
          </TopBar>
          <WindowBody>
            <div className={`Camera ${viewMedia ? 'blankscr' : ''}`}>
              {viewMedia ? (
                <div className="CameraViewMedia">
                  {img != null ? (
                    <>
                      <div className="CameraMediaImg">
                        <img src={img} alt="screenshot" ref={imageRef} />
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
                      <i className="fa-regular fa-arrow-left" />
                    </div>
                    {img != null ? (
                      <div style={{ display: 'flex' }}>
                        <a href={img} download={`Picture_${Date.now()}`}>
                          <div className="CameraButton">
                            <p>Save image</p>
                          </div>
                        </a>
                        <div
                          className="CameraButton"
                          onClick={() => {
                            setIsUntouchable(true);
                            dispatch(
                              setBlocks([
                                ...blocks,
                                {
                                  type: 'question',
                                  title: 'Delete this image?',
                                  content: 'This action is irreversible!',
                                  buttons: [
                                    { label: 'Yes', action: deleteImage },
                                    { label: 'No' },
                                  ],
                                },
                              ]),
                            );
                          }}
                        >
                          <p>Delete</p>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              ) : (
                ''
              )}
              <div className="CameraVideo">
                <div className="CameraRecordTime">
                  <p>
                    <span>
                      {('0' + Math.floor((time / 3600000) % 60)).slice(-2)}:
                    </span>
                    <span>
                      {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
                    </span>
                    <span>
                      {('0' + Math.floor((time / 1000) % 60)).slice(-2)}
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
                    <i className="fa-regular fa-camera-slash disableWebcam" />
                  </div>
                )}
                <div className={`CameraInteraction ${interaction}`}>
                  <div className="CameraAct" onClick={() => swapItem(!item)}>
                    <i
                      className={`fa-light ${item ? 'fa-camera' : 'fa-video'}`}
                    />
                  </div>
                  {item ? (
                    <div
                      className={`CameraCapture ${
                        capturing ? 'isRecording' : ''
                      }`}
                      onClick={capturing ? stopRecord : record}
                    >
                      {capturing ? (
                        <i className="fa-solid fa-square" />
                      ) : (
                        <i className="fa-light fa-video" />
                      )}
                    </div>
                  ) : (
                    <div className="CameraCapture" onClick={capture}>
                      <i className="fa-light fa-camera" />
                    </div>
                  )}
                  <div
                    className="CameraCapturedImg"
                    onClick={() => setViewMedia(!viewMedia)}
                  >
                    {img != null ? <img src={img} alt="screenshot" /> : ''}
                  </div>
                </div>
              </div>
            </div>
          </WindowBody>
        </div>
      </Draggable>
    </div>
  );
}
