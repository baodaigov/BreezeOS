import { useEffect, useRef, useState } from "react";
import { useBattery } from "react-use";
import "./LockScreen.scss";
import { useSelector, useDispatch } from "react-redux";
import { setLocked, setSleeping } from "../../reducers/settings";
import {
  setFontFamily,
  setFontSize,
  setFontWeight,
  setForegroundColor,
  setOptionsMenuShown,
} from "../../reducers/lock";
import Avatar from "../Avatar";
import useCountdown from "../../hooks/useCountdown";
import { setHeaderActive, setHeaderHide } from "../../reducers/header";
import { setDockActive, setDockHide } from "../../reducers/dock";
import { pushItem, clearItem } from "../../reducers/shutdown";
import ActMenu, { ActMenuSelector } from "../utils/menu/index";
import { setAllowSwitchWorkspace } from "../../reducers/wallpaper";
import useTime from "../../hooks/useTime";
import { useTranslation } from "react-i18next";

export default function SplashScreen() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const settings = useSelector((state) => state.settings);
  const lock = useSelector((state) => state.lock);
  const optionsMenuShown = useSelector((state) => state.lock.optionsMenuShown);
  const allowSwitchWorkspace = useSelector(
    (state) => state.wallpaper.allowSwitchWorkspace
  );
  const { secondsLeft, start } = useCountdown();
  const [curDate, setCurDate] = useState(
    new Date().toLocaleString("en-US", {
      dateStyle: "medium",
    })
  );
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [invalidCount, setInvalidCount] = useState(0);
  const invalidLimit = 7;
  const [isEditable, setEditable] = useState(false);
  const [fontFamilyMenu, showFontFamilyMenu] = useState(false);
  const [fontSizeMenu, showFontSizeMenu] = useState(false);
  const { timeFormat } = useTime();
  const inputFieldRef = useRef(null);

  function useOutsideFontFamilyMenu(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
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

  function useOutsideFontSizeMenu(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
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
      inputFieldRef.current.blur();
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

  function action(e) {
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
    setTimeout(() => {
      document
        .getElementsByClassName("SplashScreenWrapper")[0]
        .classList.add("hideInfo");
    }, 50);

    setTimeout(() => {
      dispatch(setSleeping(true));
      dispatch(setOptionsMenuShown(false));
    }, 300);

    document.addEventListener("keypress", (e) => {
      setTimeout(() => {
        dispatch(setSleeping(false));
        document
          .getElementsByClassName("SplashScreenWrapper")[0]
          .classList.remove("hideInfo");
      }, 100);
    });
  }

  function shutdown() {
    setTimeout(() => {
      document
        .getElementsByClassName("SplashScreenWrapper")[0]
        .classList.add("hideInfo");
    }, 50);

    setTimeout(() => {
      document.getElementsByClassName("Desktop")[0].classList.add("hideCursor");
      dispatch(setOptionsMenuShown(false));
    }, 800);

    setTimeout(() => {
      document
        .getElementsByClassName("TerminalWindow")[0]
        .classList.add("active");
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
            <p className="font-bold">BreezeOS</p>
          </div>
        )
      );
    }, 4800);

    setTimeout(() => {
      dispatch(clearItem());
      document.getElementsByClassName("Desktop")[0].classList.add("poweroff");
      document
        .getElementsByClassName("Wallpaper")[0]
        .classList.remove("active");
    }, 13200);
  }

  function restart() {
    shutdown();

    setTimeout(() => {
      document
        .getElementsByClassName("Desktop")[0]
        .classList.remove("poweroff");
    }, 16500);

    setTimeout(() => {
      document
        .getElementsByClassName("Desktop")[0]
        .classList.remove("blackscr");
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
      document
        .getElementsByClassName("DesktopBody")[0]
        .classList.remove("active");
      dispatch(
        pushItem(
          <div className="BootSplash">
            <p className="font-bold">BreezeOS</p>
          </div>
        )
      );
    }, 21500);

    setTimeout(() => {
      document
        .getElementsByClassName("Desktop")[0]
        .classList.remove("hideCursor");
      dispatch(clearItem());
      dispatch(pushItem(<pre>Initiating shutdown...</pre>));
      document
        .getElementsByClassName("TerminalWindow")[0]
        .classList.remove("active");
      document
        .getElementsByClassName("WallpaperWrapper")[0]
        .classList.add("active");
      dispatch(setLocked(true));
      document
        .getElementsByClassName("SplashScreenWrapper")[0]
        .classList.remove("hideInfo");
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
        <div className="SplashScreenWrapper active">
          <div className="SplashScreen">
            <div
              className={`SplashScreenInfo ${isEditable && "editable"} ${
                lock.fontFamily
              }`}
              style={{
                color: lock.foregroundColor,
              }}
              onDoubleClick={optionsMenuShown ? setEditableTrue : null}
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
                  <Avatar size={40} />
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
                            .
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
                                onInput={(e) =>
                                  setPasswordValue(e.target.value)
                                }
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
              <i class="fa-regular fa-ellipsis" />
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
              {lock.fontFamily === "OptimisticDisplay" ? (
                <ActMenuSelector
                  title="OptimisticDisplay"
                  onClick={() => {
                    dispatch(setFontFamily("OptimisticDisplay"));
                    showFontFamilyMenu(false);
                  }}
                  active
                ></ActMenuSelector>
              ) : (
                <ActMenuSelector
                  title="OptimisticDisplay"
                  onClick={() => {
                    dispatch(setFontFamily("OptimisticDisplay"));
                    showFontFamilyMenu(false);
                  }}
                ></ActMenuSelector>
              )}
              {lock.fontFamily === "SanFrancisco" ? (
                <ActMenuSelector
                  title="SanFrancisco"
                  onClick={() => {
                    dispatch(setFontFamily("SanFrancisco"));
                    showFontFamilyMenu(false);
                  }}
                  active
                ></ActMenuSelector>
              ) : (
                <ActMenuSelector
                  title="SanFrancisco"
                  onClick={() => {
                    dispatch(setFontFamily("SanFrancisco"));
                    showFontFamilyMenu(false);
                  }}
                ></ActMenuSelector>
              )}
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
              {lock.fontSize === "medium" ? (
                <ActMenuSelector
                  title={t("lockScreen.editMenu.fontSize.medium")}
                  onClick={() => {
                    dispatch(setFontSize("medium"));
                    showFontSizeMenu(false);
                  }}
                  active
                ></ActMenuSelector>
              ) : (
                <ActMenuSelector
                  title={t("lockScreen.editMenu.fontSize.medium")}
                  onClick={() => {
                    dispatch(setFontSize("medium"));
                    showFontSizeMenu(false);
                  }}
                ></ActMenuSelector>
              )}
              {lock.fontSize === "large" ? (
                <ActMenuSelector
                  title={t("lockScreen.editMenu.fontSize.large")}
                  onClick={() => {
                    dispatch(setFontSize("large"));
                    showFontSizeMenu(false);
                  }}
                  active
                ></ActMenuSelector>
              ) : (
                <ActMenuSelector
                  title={t("lockScreen.editMenu.fontSize.large")}
                  onClick={() => {
                    dispatch(setFontSize("large"));
                    showFontSizeMenu(false);
                  }}
                ></ActMenuSelector>
              )}
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
