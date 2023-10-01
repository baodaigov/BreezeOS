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
import { setHeaderActive, setHeaderHide } from "../../reducers/header";
import SurfaceIcon from "../../icons/surface.svg";
import SurfacePrivateIcon from "../../icons/surface-private.svg";
import Toggle from "../../components/utils/toggle/Toggle";

export const SurfaceApp = () => {
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
            label: "New Tab",
            action: () => dispatch(setActive(true)),
          },
          {
            label: isPrivate ? "Turn off private mode" : "Turn on private mode",
            disabled: isActive ? false : true,
            action: () =>
              isPrivate
                ? dispatch(setPrivate(false))
                : dispatch(setPrivate(true)),
          },
        ],
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

    const iFrameRef = useRef(null);

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
                <p>{isPrivate ? "New Private Tab" : "New Tab"}</p>
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
                placeholder="Search with Bing or enter address"
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
                      <p className="SettingsName">Private mode</p>
                      <Toggle
                        active={isPrivate}
                        onToggle={() => dispatch(setPrivate(!isPrivate))}
                      />
                    </div>
                    <div className="SettingsItem allowClicking">
                      <p className="SettingsName">Search engine</p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <p className="SettingsValue">Bing</p>
                        <i className="fa-regular fa-chevron-right SettingsChevron" />
                      </div>
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
                            Search with Bing or enter address, or leave blank to
                            get redirected to BreezeOS official website.
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
                      className="iFrame"
                      src={url}
                      title="New Tab"
                      frameBorder="0"
                      allowFullScreen={true}
                    />
                  ) : (
                    <div className="CantBeReached">
                      <p className="CantBeReachedText">
                        Internet is not enabled.
                      </p>
                      <div className="Description">
                        <p>
                          You need Internet connection in order to connect to
                          this website.
                        </p>
                        <div className="ButtonContainer">
                          <button className="Button">Reload</button>
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
