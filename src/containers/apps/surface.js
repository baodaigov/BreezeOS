import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActive, setHide, setPrivate } from "../../reducers/apps/surface";
import { openUrl, closeUrl } from "../../reducers/surface";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBody from "../../components/utils/window/WindowBody";
import DockItem from "../../components/DockItem";
import "./assets/surface.scss";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import StartApp from "../../components/startMenu/StartApp";
import { setHeaderHide } from "../../reducers/header";
import SurfaceIcon from "../../icons/surface.svg";
import SurfacePrivateIcon from "../../icons/surface-private.svg";
import Toggle from "../../components/utils/toggle/Toggle";
import ActMenu, { ActMenuSelector } from "../../components/utils/menu/index";
import { useTranslation } from "react-i18next";

export const SurfaceApp = () => {
  const { t } = useTranslation();
  const isActive = useSelector((state) => state.appsSurface.active);
  const isHide = useSelector((state) => state.appsSurface.hide);
  const isPrivate = useSelector((state) => state.appsSurface.private);
  const dispatch = useDispatch();

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.keyCode === 49) {
      dispatch(setActive(true));
    }
  });

  useEffect(() => {
    if (isActive) {
      document.getElementsByClassName("SurfaceApp")[0].classList.add("clicked");
      setTimeout(
        () =>
          document.getElementsByClassName("surface")[0].classList.add("active"),
        500
      );
    } else {
      document
        .getElementsByClassName("SurfaceApp")[0]
        .classList.remove("clicked");
      document.getElementsByClassName("surface")[0].classList.remove("active");
      setTimeout(() => dispatch(closeUrl()), 300);
    }
    if (isHide) {
      document.getElementsByClassName("SurfaceApp")[0].classList.add("hide");
      document.getElementsByClassName("surface")[0].classList.add("hide");
    } else {
      document.getElementsByClassName("SurfaceApp")[0].classList.remove("hide");
      document.getElementsByClassName("surface")[0].classList.remove("hide");
    }
  }, [isActive, isHide]);

  return (
    <DockItem
      id="surface"
      className="SurfaceApp"
      title="Surface"
      number="1"
      icon={SurfaceIcon}
      menu={[
        [
          {
            label: t("apps.surface.newTab"),
            action: () => dispatch(setActive(true)),
          },
          {
            label: isPrivate
              ? t("apps.surface.turnPrivateOff")
              : t("apps.surface.turnPrivateOn"),
            disabled: isActive ? false : true,
            action: () =>
              isPrivate
                ? dispatch(setPrivate(false))
                : dispatch(setPrivate(true)),
          },
        ],
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

export const SurfaceStartApp = () => {
  const isHide = useSelector((state) => state.appsSurface.hide);
  const dispatch = useDispatch();

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
      key="surface"
      icon={SurfaceIcon}
      name="Surface"
      onClick={toggle}
    />
  );
};

export default function Surface() {
  const SurfaceWindow = () => {
    const { t } = useTranslation();
    const iFrameRef = useRef(null);
    const isActive = useSelector((state) => state.appsSurface.active);
    const isPrivate = useSelector((state) => state.appsSurface.private);
    const url = useSelector((state) => state.surface.url);
    const wifi = useSelector((state) => state.settings.wifi);
    const dispatch = useDispatch();
    const [splashScreen, setSplashScreen] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [hist, setHist] = useState(["", ""]);
    const [settingsOpened, setSettingsOpened] = useState(false);
    const [supportOpened, setSupportOpened] = useState(false);
    const [searchEngineMenu, showSearchEngineMenu] = useState(false);
    isActive && setTimeout(() => setSplashScreen(false), 5000);

    const isValidURL = (string) => {
      var res = string.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      );
      return res !== null;
    };

    const action = (e) => {
      if (e.key === "Enter") {
        var qry = searchValue;

        if (isValidURL(qry)) {
          if (!qry.startsWith("http")) {
            qry = "https://" + qry;
          }
        } else if (qry === "") {
          qry = "https://breezeos.github.io";
        } else {
          qry = "https://www.bing.com/search?q=" + encodeURIComponent(qry);
        }

        setSearchValue(qry);
        setHist([hist[0], qry]);
        dispatch(openUrl(qry));
      }
    };

    function useOutsideSearchEngineMenu(ref) {
      useEffect(() => {
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            showSearchEngineMenu(false);
          }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
    }

    const searchEngineMenuRef = useRef(null);
    useOutsideSearchEngineMenu(searchEngineMenuRef);

    const [min, isMin] = useState(false);

    function minimize() {
      document
        .getElementsByClassName("surface")[0]
        .classList.toggle("minimize");
      isMin(!min);
    }

    return (
      <>
        <TopBar title="Surface" onDblClick={minimize}>
          <div className="TabBarWrapper">
            <div className="TabBar">
              <div
                className="TabBarItem TabSearchItem"
                style={{ justifyContent: "space-between" }}
              >
                <p>
                  {isPrivate
                    ? t("apps.surface.newPrivateTab")
                    : t("apps.surface.newTab")}
                </p>
                <div
                  className="CloseButton"
                  onClick={() => dispatch(setActive(false))}
                >
                  <i className="fa-regular fa-xmark" />
                </div>
              </div>
            </div>
          </div>
          <div className="TabBar">
            <div
              className="TabBarItem TabSearchItem"
              style={{ width: min ? "610px" : "700px" }}
            >
              <div className="TabBarInteraction">
                <i
                  className="fa-regular fa-chevron-left"
                  onClick={() => dispatch(openUrl(hist[0]))}
                />
                <i
                  className="fa-regular fa-chevron-right"
                  onClick={() => dispatch(openUrl(hist[1]))}
                />
                {url === "" || !wifi ? (
                  <i className="fa-regular fa-rotate-right" />
                ) : (
                  <i
                    className="fa-regular fa-rotate-right"
                    onClick={() =>
                      (iFrameRef.current.src = iFrameRef.current.src)
                    }
                  />
                )}
              </div>
              <input
                className={`TabSearch ${splashScreen && "disabled"}`}
                type="text"
                spellCheck="false"
                autoComplete="0"
                placeholder={t("apps.surface.searchPlaceholder")}
                onInput={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                onKeyDown={action}
              />
            </div>
            <div className="TabBarItem TabSettingsItem">
              <div className="TabBarInteraction">
                <i
                  className={`fa-regular fa-gear ${settingsOpened && "active"}`}
                  onMouseDown={() => setSettingsOpened(!settingsOpened)}
                />
              </div>
              <div className="TabBarInteraction">
                <i
                  className={`fa-regular fa-circle-question ${
                    supportOpened && "active"
                  }`}
                  onMouseDown={() => setSupportOpened(!supportOpened)}
                />
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
              onClose={() => dispatch(setActive(false))}
            />
          </div>
        </TopBar>
        <WindowBody>
          <div className="Surface">
            <div className="SurfaceContentContainer">
              <div className={`Settings ${settingsOpened && "active"}`}>
                <div
                  style={{
                    maxWidth: "840px",
                    margin: "0 auto",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                    }}
                  >
                    <div
                      className="CloseButton"
                      onClick={() => setSettingsOpened(false)}
                    >
                      <i className="fa-light fa-xmark" />
                    </div>
                  </div>
                  <div
                    style={{
                      maxWidth: "600px",
                      margin: "0 auto",
                    }}
                  >
                    <div className="SettingsItem">
                      <p className="SettingsName">
                        {t("apps.surface.settings.privateMode")}
                      </p>
                      <Toggle
                        active={isPrivate}
                        onToggle={() => dispatch(setPrivate(!isPrivate))}
                      />
                    </div>
                    <div className="SettingsItem">
                      <p className="SettingsName">
                        {t("apps.surface.settings.searchEngine")}
                      </p>
                      <div
                        className="SettingsMenuSection"
                        onClick={() => showSearchEngineMenu(true)}
                      >
                        <p style={{ marginRight: "7px" }}>Bing</p>
                        <i className="fa-regular fa-chevron-down" />
                      </div>
                      <ActMenu
                        style={{
                          zIndex: "1",
                          width: "200px",
                          transform: "translate(340px, 44px)",
                        }}
                        className={searchEngineMenu ? "active" : ""}
                        ref={searchEngineMenuRef}
                      >
                        <ActMenuSelector
                          title="Bing"
                          onClick={() => {
                            showSearchEngineMenu(false);
                          }}
                          active
                        ></ActMenuSelector>
                        <ActMenuSelector
                          title="Google"
                          onClick={() => {
                            showSearchEngineMenu(false);
                          }}
                        ></ActMenuSelector>
                        <ActMenuSelector
                          title="DuckDuckGo"
                          onClick={() => {
                            showSearchEngineMenu(false);
                          }}
                        ></ActMenuSelector>
                        <ActMenuSelector
                          title="Yahoo Search"
                          onClick={() => {
                            showSearchEngineMenu(false);
                          }}
                        ></ActMenuSelector>
                      </ActMenu>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`Support ${supportOpened && "active"}`}>
                <div
                  style={{
                    maxWidth: "840px",
                    margin: "0 auto",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                    }}
                  >
                    <div
                      className="CloseButton"
                      onClick={() => setSupportOpened(false)}
                    >
                      <i className="fa-light fa-xmark" />
                    </div>
                  </div>
                </div>
                {/* <iframe
                  className="SupportFrame"
                  src="https://breezeos.github.io"
                /> */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p>iFrame is not available for this dialog.</p>
                </div>
              </div>
              {url === "" ? (
                <>
                  <div
                    className={`SplashScreen ${isPrivate && "private"} ${
                      !splashScreen && "disabled"
                    }`}
                  >
                    {isPrivate ? (
                      <img
                        className="SplashScreenIcon"
                        src={SurfacePrivateIcon}
                      />
                    ) : (
                      <img className="SplashScreenIcon" src={SurfaceIcon} />
                    )}
                  </div>
                  <div className="MainScreen">
                    <div className="Main">
                      <div className="NonCollapsibleSection">
                        <div className="SearchWrapper">
                          <p className="Text">
                            {t("apps.surface.startupTitle")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {wifi ? (
                    <iframe
                      ref={iFrameRef}
                      className="iFrame"
                      src={url}
                      title={t("apps.surface.newTab")}
                      allowFullScreen={true}
                    />
                  ) : (
                    <div className="CantBeReached">
                      <p className="CantBeReachedText">
                        {t("apps.surface.internetUnabled")}
                      </p>
                      <div className="Description">
                        <p>{t("apps.surface.internetUnabledDesc")}</p>
                        <div className="ButtonContainer">
                          <button className="Button">
                            {t("apps.surface.internatUnabledReload")}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </WindowBody>
      </>
    );
  };

  return (
    <div className="SurfaceWindow">
      <div className="Window surface" key={Math.random()}>
        <SurfaceWindow />
      </div>
    </div>
  );
}
