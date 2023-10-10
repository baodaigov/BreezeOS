import React, { useEffect, useRef, useState } from "react";
import { useBattery } from "react-use";
import "./LockScreen.scss";
import { setLocked, setSleeping } from "@/store/reducers/settings";
import {
  setFontFamily,
  setFontSize,
  setFontWeight,
  setForegroundColor,
  setOptionsMenuShown,
  setSplashScreenWrapperHideInfo,
} from "@/store/reducers/lock";
import { setTerminalWindowActive } from "@/store/reducers/terminalwindow";
import Avatar from "../Avatar";
import useCountdown from "@/hooks/useCountdown";
import { setHeaderActive, setHeaderHide } from "@/store/reducers/header";
import { setDockActive, setDockHide } from "@/store/reducers/dock";
import { pushItem, clearItem } from "@/store/reducers/shutdown";
import LogoD from "@/images/logo-d.svg";
import ActMenu, { ActMenuSelector } from "../utils/menu/index";
import {
  setAllowSwitchWorkspace,
  setWallpaperActive,
} from "@/store/reducers/wallpaper";
import useTime from "@/hooks/useTime";
import { useTranslation } from "react-i18next";
import { setDesktopBodyActive } from "@/store/reducers/desktopbody";
import {
  setDesktopBlackScr,
  setDesktopHideCursor,
  setDesktopPoweroff,
} from "@/store/reducers/desktop";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function SplashScreen() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const settings = useAppSelector((state) => state.settings);
  const lock = useAppSelector((state) => state.lock);
  const optionsMenuShown = useAppSelector(
    (state) => state.lock.optionsMenuShown
  );
  const allowSwitchWorkspace = useAppSelector(
    (state) => state.wallpaper.allowSwitchWorkspace
  );
  const wrapperActive = useAppSelector(
    (state) => state.lock.splashScreen.wrapperActive
  );
  const wrapperHideInfo = useAppSelector(
    (state) => state.lock.splashScreen.wrapperHideInfo
  );
  const { secondsLeft, start } = useCountdown();
  const [curDate, setCurDate] = useState(
    new Date().toLocaleString("en-US", {
      dateStyle: "medium",
    })
  );
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [invalidCount, setInvalidCount] = useState<number>(0);
  const invalidLimit = 7;
  const [isEditable, setEditable] = useState<boolean>(false);
  const [fontFamilyMenu, showFontFamilyMenu] = useState<boolean>(false);
  const [fontSizeMenu, showFontSizeMenu] = useState<boolean>(false);
  const { timeFormat } = useTime();
  const inputFieldRef = useRef<HTMLInputElement>(null);

  function useOutsideFontFamilyMenu(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showFontFamilyMenu(false);
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

  const fontFamilyMenuRef = useRef(null);
  useOutsideFontFamilyMenu(fontFamilyMenuRef);

  function useOutsideFontSizeMenu(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showFontSizeMenu(false);
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

  const fontSizeMenuRef = useRef(null);
  useOutsideFontSizeMenu(fontSizeMenuRef);

  useEffect(() => {
    setInterval(() => {
      setCurDate(
        new Date().toLocaleString("en-US", {
          dateStyle: "medium",
        })
      );
    }, 1000);
  }, []);

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) dispatch(setOptionsMenuShown(false));
  });

  useEffect(() => {
    if (secondsLeft <= 0) {
      setInvalidCount(0);
    }
  }, [secondsLeft]);

  function login() {
    dispatch(setLocked(false));
    if (settings.user.password !== "") {
      setInvalidCount(0);
      setPasswordValue("");
      inputFieldRef.current?.blur();
    }
    if (allowSwitchWorkspace) {
      dispatch(setAllowSwitchWorkspace(false));
      dispatch(setHeaderHide(false));
      dispatch(setDockHide(false));
    }
  }

  function wrongPassword() {
    setInvalidCount((prev) => prev + 1);
    setPasswordValue("");
  }

  function action(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (passwordValue !== settings.user.password) {
        wrongPassword();
      } else {
        login();
      }
      if (invalidCount === invalidLimit - 1) start(60);
    }
  }

  const batteryIcon = { icon: "fa-regular fa-battery-full" };

  const batteryState = useBattery();

  let batteryPercent = Math.round(batteryState.level * 100);

  function sleep() {
    setTimeout(() => dispatch(setSplashScreenWrapperHideInfo(true)), 50);

    setTimeout(() => {
      dispatch(setSleeping(true));
      dispatch(setOptionsMenuShown(false));
    }, 300);

    document.addEventListener("keypress", () => {
      setTimeout(() => {
        dispatch(setSleeping(false));
        dispatch(setSplashScreenWrapperHideInfo(false));
      }, 100);
    });
  }

  function shutdown() {
    setTimeout(() => dispatch(setSplashScreenWrapperHideInfo(true)), 50);

    setTimeout(() => {
      dispatch(setDesktopHideCursor(true));
      dispatch(setOptionsMenuShown(false));
    }, 800);

    setTimeout(() => {
      dispatch(setTerminalWindowActive(true));
      dispatch(pushItem(<pre>Initiating shutdown...</pre>));
    }, 2500);

    setTimeout(
      () => dispatch(pushItem(<pre>Stopped Load/Save Random Seed... OK</pre>)),
      3000
    );

    setTimeout(() => {
      dispatch(pushItem(<pre>Stopped Session 1 of localhost... OK</pre>));
      dispatch(pushItem(<pre>Removed slice system-getty.slice... OK</pre>));
      dispatch(pushItem(<pre>Stopped Login Service... OK</pre>));
    }, 3500);

    setTimeout(() => {
      dispatch(pushItem(<pre>Stopped Initializes Pacman keyring... OK</pre>));
      dispatch(pushItem(<pre>Stopping Breeze Desktop Environment...</pre>));
    }, 3600);

    setTimeout(() => {
      dispatch(pushItem(<pre>Starting Plymouth Service...</pre>));
    }, 4000);

    setTimeout(() => {
      dispatch(clearItem());
      dispatch(setLocked(false));
      dispatch(
        pushItem(
          <div className="BootSplash">
            <img src={LogoD} width={431} height={240} />
          </div>
        )
      );
    }, 4800);

    setTimeout(() => {
      dispatch(clearItem());
      dispatch(setDesktopPoweroff(true));
      dispatch(setWallpaperActive(false));
    }, 13200);
  }

  function restart() {
    shutdown();

    setTimeout(() => dispatch(setDesktopPoweroff(false)), 16500);

    setTimeout(() => {
      dispatch(setDesktopBlackScr(false));
      dispatch(clearItem());
      dispatch(pushItem(<pre>Reached target Startup... OK</pre>));
    }, 19000);

    setTimeout(() => {
      dispatch(pushItem(<pre>Started Startup... OK</pre>));
    }, 19700);

    setTimeout(() => {
      dispatch(pushItem(<pre>Starting Plymouth Service...</pre>));
    }, 20200);

    setTimeout(() => {
      dispatch(clearItem());
      dispatch(setHeaderActive(false));
      dispatch(setDockActive(false));
      dispatch(setDesktopBodyActive(false));
      dispatch(
        pushItem(
          <div className="BootSplash">
            <img src={LogoD} width={431} height={240} />
          </div>
        )
      );
    }, 21500);

    setTimeout(() => {
      dispatch(setDesktopHideCursor(false));
      dispatch(clearItem());
      dispatch(pushItem(<pre>Initiating shutdown...</pre>));
      dispatch(setTerminalWindowActive(false));
      dispatch(setWallpaperActive(true));
      dispatch(setLocked(true));
      dispatch(setSplashScreenWrapperHideInfo(false));
    }, 36000);
  }

  function setEditableTrue() {
    setEditable(true);
    dispatch(setOptionsMenuShown(false));
  }

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "30px 60px 40px 60px",
        }}
      >
        <div
          className={`SplashScreenWrapper ${wrapperActive && "active"} ${
            wrapperHideInfo && "hideInfo"
          }`}
        >
          <div className="SplashScreen">
            <div
              className={`SplashScreenInfo ${isEditable && "editable"} ${
                lock.fontFamily
              }`}
              style={{
                color: lock.foregroundColor,
              }}
              onDoubleClick={optionsMenuShown ? setEditableTrue : undefined}
            >
              <p
                className="SplashScreenTime"
                style={{
                  fontWeight: lock.fontWeight,
                  fontSize: lock.fontSize === "large" ? "99px" : "90px",
                }}
              >
                {timeFormat}
              </p>
              <div className="SplashScreenWidgets">
                <div className="SplashScreenItem">
                  <p className="SplashScreenDare">{curDate}</p>
                </div>
                <div className="SplashScreenItem">
                  <i className={`${batteryIcon.icon} SplashScreenIcon`} />
                  {isNaN(batteryPercent) ? "-" : batteryPercent + "%"}
                </div>
              </div>
            </div>
            <div className="SignInWrapper">
              <div style={{ marginBottom: "30px" }}>
                <div className={`SignInInfo ${optionsMenuShown && "expand"}`}>
                  <Avatar />
                  <p className="SignInName">{settings.user.name}</p>
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  height: "72.5px",
                  width: "550px",
                }}
              >
                <div className={`SignInItem ${optionsMenuShown && "disabled"}`}>
                  <div className="SignIn">
                    {settings.user.password ? (
                      <>
                        {invalidCount === invalidLimit ? (
                          <p>
                            {invalidLimit} {t("lockScreen.locked")}{" "}
                            {secondsLeft}{" "}
                            {secondsLeft === 1
                              ? t("lockScreen.lockedSecond")
                              : t("lockScreen.lockedSeconds")}
                          </p>
                        ) : (
                          <>
                            <div className="SignInPassword">
                              <input
                                type={passwordShown ? "text" : "password"}
                                value={passwordValue}
                                placeholder={t(
                                  "lockScreen.passwordPlaceholder"
                                )}
                                onInput={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => setPasswordValue(e.target.value)}
                                onKeyDown={action}
                                ref={inputFieldRef}
                              />
                              {passwordValue.length !== 0 && (
                                <div
                                  className="SignInRevealAndClear"
                                  onClick={() =>
                                    passwordShown
                                      ? setPasswordShown(false)
                                      : setPasswordShown(true)
                                  }
                                >
                                  <i
                                    className={`fa-regular ${
                                      passwordShown ? "fa-eye-slash" : "fa-eye"
                                    }`}
                                  />
                                </div>
                              )}
                            </div>
                            <div
                              className={`LoginButton ${
                                passwordValue.length === 0 && "disabled"
                              }`}
                              onClick={
                                passwordValue !== settings.user.password
                                  ? wrongPassword
                                  : login
                              }
                            >
                              <i className="fa-regular fa-arrow-right SplashScreenIcon" />
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="LoginButton" onClick={login}>
                        <i className="fa-regular fa-arrow-right SplashScreenIcon" />
                      </div>
                    )}
                  </div>
                  {invalidCount !== invalidLimit && (
                    <p
                      className="SignInFailedAttempts"
                      style={{ opacity: invalidCount ? "1" : "0" }}
                    >
                      {invalidCount}{" "}
                      {invalidCount > 1
                        ? t("lockScreen.incorrectPasswordPlural")
                        : t("lockScreen.incorrectPassword")}
                    </p>
                  )}
                </div>
                <div
                  className={`SignInItem ${!optionsMenuShown && "disabled"}`}
                >
                  <div className="PowerMenu">
                    <div style={{ display: "flex" }}>
                      <div
                        className="PowerMenuInteractionWrapper"
                        onClick={sleep}
                      >
                        <div className="PowerMenuInteraction">
                          <i className="fa-light fa-moon" />
                        </div>
                        <p className="PowerMenuName">
                          {t("lockScreen.interactions.sleep")}
                        </p>
                      </div>
                      <div
                        className="PowerMenuInteractionWrapper"
                        onClick={() => dispatch(setOptionsMenuShown(false))}
                      >
                        <div className="PowerMenuInteraction">
                          <i className="fa-light fa-lock" />
                        </div>
                        <p className="PowerMenuName">
                          {t("lockScreen.interactions.lock")}
                        </p>
                      </div>
                      <div
                        className="PowerMenuInteractionWrapper"
                        onClick={shutdown}
                      >
                        <div className="PowerMenuInteraction">
                          <i className="fa-light fa-power-off" />
                        </div>
                        <p className="PowerMenuName">
                          {t("lockScreen.interactions.shutdown")}
                        </p>
                      </div>
                      <div
                        className="PowerMenuInteractionWrapper"
                        onClick={restart}
                      >
                        <div className="PowerMenuInteraction">
                          <i className="fa-light fa-rotate-left" />
                        </div>
                        <p className="PowerMenuName">
                          {t("lockScreen.interactions.restart")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!isEditable && (
            <div
              className={`OptionsButton ${optionsMenuShown && "active"}`}
              onClick={() => dispatch(setOptionsMenuShown(!optionsMenuShown))}
            >
              <i className="fa-regular fa-ellipsis" />
            </div>
          )}
        </div>
      </div>
      <div className={`EditMenuWrapper ${isEditable && "active"}`}>
        <div className="EditMenu">
          <div
            style={{
              marginBottom: "15px",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <div className="CloseButton" onClick={() => setEditable(false)}>
              <i className="fa-regular fa-xmark" />
            </div>
          </div>
          <div className="EditMenuItem" style={{ margin: 0 }}>
            <p className="EditMenuItemName">
              {t("lockScreen.editMenu.fontFamily")}
            </p>
            <div
              className="EditMenuItemSection"
              onClick={() => showFontFamilyMenu(true)}
            >
              <p style={{ marginRight: "7px" }}>{lock.fontFamily}</p>
              <i className="fa-regular fa-chevron-down" />
            </div>
            <ActMenu
              style={{
                zIndex: "1",
                width: "220px",
                transform: "translate(230px, 17px)",
              }}
              className={fontFamilyMenu ? "active" : ""}
              ref={fontFamilyMenuRef}
            >
              <ActMenuSelector
                title="OptimisticDisplay"
                onClick={() => {
                  dispatch(setFontFamily("OptimisticDisplay"));
                  showFontFamilyMenu(false);
                }}
                active={lock.fontFamily === "OptimisticDisplay"}
              />
              <ActMenuSelector
                title="SanFrancisco"
                onClick={() => {
                  dispatch(setFontFamily("SanFrancisco"));
                  showFontFamilyMenu(false);
                }}
                active={lock.fontFamily === "SanFrancisco"}
              />
            </ActMenu>
          </div>
          <div className="EditMenuItem">
            <p className="EditMenuItemName">
              {t("lockScreen.editMenu.fontSize.name")}
            </p>
            <div
              className="EditMenuItemSection"
              onClick={() => showFontSizeMenu(true)}
            >
              <p style={{ marginRight: "7px" }}>{lock.fontSize}</p>
              <i className="fa-regular fa-chevron-down" />
            </div>
            <ActMenu
              style={{
                zIndex: "1",
                width: "220px",
                transform: "translate(230px, 17px)",
              }}
              className={fontSizeMenu ? "active" : ""}
              ref={fontSizeMenuRef}
            >
              <ActMenuSelector
                title={t("lockScreen.editMenu.fontSize.medium")}
                onClick={() => {
                  dispatch(setFontSize("medium"));
                  showFontSizeMenu(false);
                }}
                active={lock.fontSize === "medium"}
              />
              <ActMenuSelector
                title={t("lockScreen.editMenu.fontSize.large")}
                onClick={() => {
                  dispatch(setFontSize("large"));
                  showFontSizeMenu(false);
                }}
                active={lock.fontSize === "large"}
              />
            </ActMenu>
          </div>
          <div className="EditMenuItem" style={{ padding: "0 30px" }}>
            <div
              className={`FontWeightBlock ${
                lock.fontWeight === 200 && "active"
              } ${lock.fontFamily}`}
              style={{
                color: lock.foregroundColor,
              }}
              onClick={() => dispatch(setFontWeight(200))}
            >
              <p className="font-light">12</p>
            </div>
            <div
              className={`FontWeightBlock ${
                lock.fontWeight === 500 && "active"
              } ${lock.fontFamily}`}
              style={{
                color: lock.foregroundColor,
              }}
              onClick={() => dispatch(setFontWeight(500))}
            >
              <p className="font-medium">12</p>
            </div>
            <div
              className={`FontWeightBlock ${
                lock.fontWeight === 700 && "active"
              } ${lock.fontFamily}`}
              style={{
                color: lock.foregroundColor,
              }}
              onClick={() => dispatch(setFontWeight(700))}
            >
              <p className="font-bold">12</p>
            </div>
          </div>
          <div className="EditMenuItem" style={{ padding: "0 50px" }}>
            <div
              className={`ColorBlock ${
                lock.foregroundColor === "#e2e2e2" && "active"
              }`}
              style={{ backgroundColor: "#e2e2e2" }}
              onClick={() => dispatch(setForegroundColor("#e2e2e2"))}
            ></div>
            <div
              className={`ColorBlock ${
                lock.foregroundColor === "#fef08a" && "active"
              }`}
              style={{ backgroundColor: "#fef08a" }}
              onClick={() => dispatch(setForegroundColor("#fef08a"))}
            ></div>
            <div
              className={`ColorBlock ${
                lock.foregroundColor === "#7dd3fc" && "active"
              }`}
              style={{ backgroundColor: "#7dd3fc" }}
              onClick={() => dispatch(setForegroundColor("#7dd3fc"))}
            ></div>
            <div
              className={`ColorBlock ${
                lock.foregroundColor === "#f0abfc" && "active"
              }`}
              style={{ backgroundColor: "#f0abfc" }}
              onClick={() => dispatch(setForegroundColor("#f0abfc"))}
            ></div>
            <div
              className={`ColorBlock ${
                lock.foregroundColor === "#86efac" && "active"
              }`}
              style={{ backgroundColor: "#86efac" }}
              onClick={() => dispatch(setForegroundColor("#86efac"))}
            ></div>
            <div
              className={`ColorBlock ${
                lock.foregroundColor === "#f87171" && "active"
              }`}
              style={{ backgroundColor: "#f87171" }}
              onClick={() => dispatch(setForegroundColor("#f87171"))}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
