import React, { useState, useEffect, useRef } from "react";
import { setActive, setHide, setSettings } from "../../reducers/apps/settings";
import {
  insertPasswordFor,
  cancelPassword,
  setInputPassword,
  setPasswordDisable,
  displayPassword,
  setWrongPassword,
} from "../../reducers/wifipassword";
import {
  toggleActive,
  setSecurity,
  setWifiName,
  setInactive,
} from "../../reducers/newwifi";
import { switchIcons } from "../../reducers/appearance";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleAirplaneModeOff,
  toggleAirplaneModeOn,
  toggleLightMode,
  toggleDarkMode,
  toggleWifi,
  toggleNotifications,
  toggleBluetooth,
  setDeviceName,
  toggle12Hour,
  setFontFamily,
  setName,
} from "../../reducers/settings";
import { changeWallpaper } from "../../reducers/wallpaper";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBody from "../../components/utils/window/WindowBody";
import DockItem from "../../components/DockItem";
import "./assets/settings.scss";
import "../../components/utils/widget/Clock.scss";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import StartApp from "../../components/startMenu/StartApp";
import ActMenu, { ActMenuSelector } from "../../components/utils/menu/index";
import Image1 from "./assets/dark.png";
import Image2 from "./assets/light.png";
import LogoD from "./assets/logo-d.png";
import LogoL from "./assets/logo-l.png";
import W1 from "../../components/default.jpg";
import W2 from "../../components/52697.jpg";
import W3 from "../../components/52496.jpg";
import W4 from "../../components/52791.jpg";
import W5 from "../../components/52532.jpg";
import W6 from "../../components/52544.jpg";
import Wifi1 from "./assets/BreezeOS-WiFi.png";
import { changeShell } from "../../reducers/shell";
import {
  setHeaderActive,
  setHeaderType,
  setProMode,
  setWidth,
} from "../../reducers/header";
import Avatar from "../../components/Avatar";

export const SettingsApp = () => {
  const isActive = useSelector((state) => state.appsSettings.active);
  const isHide = useSelector((state) => state.appsSettings.hide);
  const dispatch = useDispatch();
  const icon = useSelector((state) => state.appearance.iconTheme);

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.keyCode === 51) {
      dispatch(setActive(true));
    }
  });

  useEffect(() => {
    if (isActive) {
      document
        .getElementsByClassName("SettingsApp")[0]
        .classList.add("clicked");
      setTimeout(
        () =>
          document
            .getElementsByClassName("settings")[0]
            .classList.add("active"),
        500
      );
    } else {
      document
        .getElementsByClassName("SettingsApp")[0]
        .classList.remove("clicked");
      document.getElementsByClassName("settings")[0].classList.remove("active");
    }
    if (isHide) {
      document.getElementsByClassName("SettingsApp")[0].classList.add("hide");
      document.getElementsByClassName("settings")[0].classList.add("hide");
    } else {
      document
        .getElementsByClassName("SettingsApp")[0]
        .classList.remove("hide");
      document.getElementsByClassName("settings")[0].classList.remove("hide");
    }
  }, [isActive, isHide]);

  return (
    <>
      <DockItem
        id="settings"
        className="SettingsApp"
        title="Settings"
        icon={
          icon === "WhiteSur-icon-theme"
            ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/applications-system.svg"
            : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/applications-system.svg"
        }
        menu={[
          [
            {
              label: isActive ? "Quit" : "Open",
              action: () =>
                isActive
                  ? dispatch(setActive(false))
                  : dispatch(setActive(true)),
            },
          ],
        ]}
        onClick={() =>
          isHide ? dispatch(setHide(false)) : dispatch(setActive(true))
        }
      />
    </>
  );
};

export const SettingsStartApp = () => {
  const isHide = useSelector((state) => state.appsSettings.hide);
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
      key="settings"
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/applications-system.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/applications-system.svg"
      }
      name="Settings"
      onClick={toggle}
    />
  );
};

export default function Settings() {
  const SettingsWindow = () => {
    const settingsReducer = useSelector((state) => state.settings);
    const shellTheme = useSelector((state) => state.shell.theme);
    const wifis = useSelector((state) => state.settings.wifiList);
    const settings = useSelector((state) => state.appsSettings.settings);
    const header = useSelector((state) => state.header);
    const widget = useSelector((state) => state.widget);
    const [wallpaperValue, setValueWallpaper] = useState("1");
    const dispatch = useDispatch();

    useEffect(() => {
      if (shellTheme === "WhiteSur") {
        dispatch(setProMode(false));
      }
    }, [shellTheme]);

    const navItems = [
      [
        {
          name: "Wi-Fi",
          icon: "fa-regular fa-wifi",
          active: settings === "Wi-Fi",
          onClick: () => dispatch(setSettings("Wi-Fi")),
        },
        {
          name: "Bluetooth",
          icon: "fa-regular fa-bluetooth",
          active: settings === "Bluetooth",
          onClick: () => dispatch(setSettings("Bluetooth")),
        },
        {
          name: "Network",
          icon: "fa-regular fa-globe",
          active: settings === "Network",
          onClick: () => dispatch(setSettings("Network")),
        },
      ],
      [
        {
          name: "Appearance",
          icon: "fa-regular fa-paintbrush",
          active: settings === "Appearance",
          onClick: () => dispatch(setSettings("Appearance")),
        },
        {
          name: "Widgets",
          icon: "fa-regular fa-shapes",
          active: settings === "Widgets",
          onClick: () => dispatch(setSettings("Widgets")),
        },
        {
          name: "Notifications",
          icon: "fa-regular fa-bell",
          active: settings === "Notifications",
          onClick: () => dispatch(setSettings("Notifications")),
        },
        {
          name: "Search",
          icon: "fa-regular fa-magnifying-glass",
          active: settings === "Search",
          onClick: () => dispatch(setSettings("Search")),
        },
      ],
      [
        {
          name: "Apps",
          icon: "fa-regular fa-grid-2",
          active: settings === "Apps",
          onClick: () => dispatch(setSettings("Apps")),
        },
        {
          name: "Privacy",
          icon: "fa-regular fa-lock",
          active: settings === "Privacy",
          onClick: () => dispatch(setSettings("Privacy")),
        },
        {
          name: "Security",
          icon: "fa-solid fa-shield-halved",
          active: settings === "Security",
          onClick: () => dispatch(setSettings("Security")),
        },
        {
          name: "Online Accounts",
          icon: "fa-regular fa-at",
          active: settings === "Online Accounts",
          onClick: () => dispatch(setSettings("Online Accounts")),
        },
        {
          name: "Share",
          icon: "fa-regular fa-share-nodes",
          active: settings === "Share",
          onClick: () => dispatch(setSettings("Share")),
        },
      ],
      [
        {
          name: "Updates",
          icon: "fa-regular fa-rotate",
          active: settings === "Updates",
          onClick: () => dispatch(setSettings("Updates")),
        },
        {
          name: "Sound",
          icon: "fa-regular fa-volume",
          active: settings === "Sound",
          onClick: () => dispatch(setSettings("Sound")),
        },
        {
          name: "Battery",
          icon: "fa-regular fa-battery-full",
          active: settings === "Battery",
          onClick: () => dispatch(setSettings("Battery")),
        },
        {
          name: "Displays",
          icon: "fa-regular fa-desktop",
          active: settings === "Displays",
          onClick: () => dispatch(setSettings("Displays")),
        },
        {
          name: "Mouse & Touchpad",
          icon: "fa-regular fa-computer-mouse",
          active: settings === "Mouse & Touchpad",
          onClick: () => dispatch(setSettings("Mouse & Touchpad")),
        },
        {
          name: "Keyboard",
          icon: "fa-regular fa-keyboard",
          active: settings === "Keyboard",
          onClick: () => dispatch(setSettings("Keyboard")),
        },
        {
          name: "Printer",
          icon: "fa-regular fa-print",
          active: settings === "Printer",
          onClick: () => dispatch(setSettings("Printer")),
        },
      ],
      [
        {
          name: "Users",
          icon: "fa-regular fa-user",
          active: settings === "Users",
          onClick: () => dispatch(setSettings("Users")),
        },
        {
          name: "Region & Language",
          icon: "fa-regular fa-language",
          active: settings === "Region & Language",
          onClick: () => dispatch(setSettings("Region & Language")),
        },
        {
          name: "Accessibility",
          icon: "fa-regular fa-universal-access",
          active: settings === "Accessibility",
          onClick: () => dispatch(setSettings("Accessibility")),
        },
        {
          name: "Date & Time",
          icon: "fa-regular fa-clock",
          active: settings === "Date & Time",
          onClick: () => dispatch(setSettings("Date & Time")),
        },
        {
          name: "About",
          icon: "fa-regular fa-circle-info",
          active: settings === "About",
          onClick: () => dispatch(setSettings("About")),
        },
      ],
    ];

    const nw = useSelector((state) => state.newwifi);
    const [cursorMenu, showCursorMenu] = useState(false);
    const [fontsMenu, showFontsMenu] = useState(false);
    const [iconsMenu, showIconsMenu] = useState(false);
    const [shellMenu, showShellMenu] = useState(false);
    const [soundMenu, showSoundMenu] = useState(false);
    const [orientationMenu, showOrientationMenu] = useState(false);
    const [resolutionMenu, showResolutionMenu] = useState(false);
    const [refreshRateMenu, showRefreshRateMenu] = useState(false);
    const [securityMenu, showSecurityMenu] = useState(false);
    const [editDeviceName, allowEditDeviceName] = useState(false);

    function useOutsideCursorMenu(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            showCursorMenu(false);
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

    const cursorMenuRef = useRef(null);
    useOutsideCursorMenu(cursorMenuRef);

    function useOutsideIconsMenu(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            showIconsMenu(false);
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

    const iconsMenuRef = useRef(null);
    useOutsideIconsMenu(iconsMenuRef);

    function useOutsideShellMenu(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            showShellMenu(false);
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

    const shellMenuRef = useRef(null);
    useOutsideShellMenu(shellMenuRef);

    function useOutsideSoundMenu(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            showSoundMenu(false);
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

    const soundMenuRef = useRef(null);
    useOutsideSoundMenu(soundMenuRef);

    function useOutsideFontsMenu(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            showFontsMenu(false);
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

    const fontsMenuRef = useRef(null);
    useOutsideFontsMenu(fontsMenuRef);

    function useOutsideOrientationMenu(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            showOrientationMenu(false);
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

    const orientationMenuRef = useRef(null);
    useOutsideOrientationMenu(orientationMenuRef);

    function useOutsideResolutionMenu(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            showResolutionMenu(false);
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

    const resolutionMenuRef = useRef(null);
    useOutsideResolutionMenu(resolutionMenuRef);

    function useOutsideRRMenu(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            showRefreshRateMenu(false);
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

    const refreshRateMenuRef = useRef(null);
    useOutsideRRMenu(refreshRateMenuRef);

    function useOutsideSecurityMenu(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            showSecurityMenu(false);
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

    const securityMenuRef = useRef(null);
    useOutsideSecurityMenu(securityMenuRef);

    const [maximumExceeded, displayMaximumExceeded] = useState(false);

    function submitDeviceName(e) {
      if (e.key === "Enter") {
        if (e.target.value.length > 43) {
          displayMaximumExceeded(true);
          dispatch(setDeviceName(settingsReducer.deviceName));
        } else {
          allowEditDeviceName(false);
          dispatch(setDeviceName(e.target.value));
        }
      }
    }

    function switchWallpaper(i, j) {
      dispatch(changeWallpaper(i));
      setValueWallpaper(j);
    }

    const [shareWifi, setShareWifi] = useState(false);
    const [usersTab, setUsersTab] = useState("");

    var mouseHold;

    function mouseUp() {
      if (mouseHold) window.clearTimeout(mouseHold);
    }

    function mouseDown() {
      mouseHold = window.setTimeout(() => setShareWifi(true), 800);
    }

    const appearanceReducer = useSelector((state) => state.appearance);

    function changeIcons(e) {
      dispatch(switchIcons(e));
      showIconsMenu(false);
    }

    function switchShell(e) {
      dispatch(changeShell(e));
      showShellMenu(false);
    }

    function changeFont(e) {
      dispatch(setFontFamily(e));
      showFontsMenu(false);
    }

    function toggleDoNotDisturb() {
      dispatch(toggleNotifications(!settingsReducer.notifications));
      dispatch(setHeaderType(""));
      dispatch(setWidth(300));
      setTimeout(() => {
        dispatch(setHeaderType("notifications"));
      }, 200);
      setTimeout(() => {
        dispatch(setHeaderType(""));
        dispatch(setWidth(900));
      }, 2350);
      setTimeout(() => {
        dispatch(setHeaderType("default"));
      }, 2500);
    }

    function switchTab() {
      switch (settings) {
        case "Wi-Fi":
          return (
            <>
              <div
                className="WiFiWrapper"
                style={{ height: !settingsReducer.wifi ? "100%" : "" }}
              >
                <div className="WiFi">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "649.516px",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "40px",
                      }}
                    >
                      <p className="font-bold">Airplane Mode</p>
                      <div
                        className={`Toggle ${
                          shellTheme === "WhiteSur" ? "whitesur" : ""
                        } ${settingsReducer.airplaneMode ? "active" : ""}`}
                        onClick={
                          settingsReducer.airplaneMode
                            ? () => dispatch(toggleAirplaneModeOff())
                            : () => dispatch(toggleAirplaneModeOn())
                        }
                      ></div>
                    </div>
                    {settingsReducer.wifi ? (
                      <>
                        <p
                          className="font-bold"
                          style={{ marginBottom: "30px" }}
                        >
                          Visible Networks
                        </p>
                        <div className="VisibleNetworks">
                          {wifis.map((i) => (
                            <>
                              {i.connected ? (
                                <div
                                  className="VisibleNetworksItem"
                                  onMouseDown={mouseDown}
                                  onMouseUp={mouseUp}
                                >
                                  <p>{i.name}</p>
                                  <div className="VisibleNetworksIcon">
                                    {i.connected ? (
                                      <i className="fa-solid fa-check"></i>
                                    ) : (
                                      ""
                                    )}
                                    {i.private ? (
                                      <i className="fa-solid fa-lock"></i>
                                    ) : (
                                      ""
                                    )}
                                    {i.status == "good" ? (
                                      <i className="fa-solid fa-wifi"></i>
                                    ) : i.status == "fair" ? (
                                      <i className="fa-duotone fa-wifi-fair"></i>
                                    ) : i.status == "weak" ? (
                                      <i className="fa-duotone fa-wifi-weak"></i>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div
                                    className="VisibleNetworksItem"
                                    onClick={() =>
                                      dispatch(insertPasswordFor(i.name))
                                    }
                                  >
                                    <p>{i.name}</p>
                                    <div className="VisibleNetworksIcon">
                                      {i.connected ? (
                                        <i className="fa-solid fa-check"></i>
                                      ) : (
                                        ""
                                      )}
                                      {i.private ? (
                                        <i className="fa-solid fa-lock"></i>
                                      ) : (
                                        ""
                                      )}
                                      {i.status == "good" ? (
                                        <i className="fa-solid fa-wifi"></i>
                                      ) : i.status == "fair" ? (
                                        <i className="fa-duotone fa-wifi-fair"></i>
                                      ) : i.status == "weak" ? (
                                        <i className="fa-duotone fa-wifi-weak"></i>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                </>
                              )}
                            </>
                          ))}
                          <div
                            className="VisibleNetworksItem"
                            onClick={() => dispatch(toggleActive(true))}
                          >
                            <p>Other...</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="StatusWifiFalse">
                        <i className="fa-solid fa-wifi-slash"></i>
                        <p className="Title font-bold">Wi-Fi Has Turned Off</p>
                        <p className="Description">
                          To get access to Internet connection, please turn on
                          the Wi-Fi.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        case "Bluetooth":
          return (
            <>
              <div className="BluetoothWrapper">
                <div className="Bluetooth">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "649.516px",
                      height: "100%",
                    }}
                  >
                    {settingsReducer.bluetooth ? (
                      <div className="BluetoothDevices">
                        <p className="Description">
                          Now discoverable as "{settingsReducer.deviceName}".
                        </p>
                        <div style={{ marginTop: "30px" }}>
                          <p
                            className="font-bold"
                            style={{ marginBottom: "30px" }}
                          >
                            Other Devices
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="StatusBluetoothFalse">
                        <i className="fa-solid fa-bluetooth"></i>
                        <p className="Title font-bold">
                          Bluetooth Has Turned Off
                        </p>
                        <p className="Description">
                          To get access to Bluetooth devices, please turn on the
                          Bluetooth.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        case "Appearance":
          return (
            <div className="AppearanceWrapper">
              <div className="Appearance">
                <div
                  className="WindowColors"
                  value={settingsReducer.themeLight ? "2" : "1"}
                >
                  <p className="font-bold" style={{ marginBottom: "30px" }}>
                    Window colors
                  </p>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      className="ImageContainer dark"
                      style={{ marginRight: "20px" }}
                      onClick={() => dispatch(toggleDarkMode())}
                    >
                      <img src={Image1} />
                    </div>
                    <div
                      className="ImageContainer light"
                      onClick={() => dispatch(toggleLightMode())}
                    >
                      <img src={Image2} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="Appearance">
                <div className="Wallpapers" value={wallpaperValue}>
                  <p className="font-bold" style={{ marginBottom: "30px" }}>
                    Wallpaper
                  </p>
                  <div
                    style={{
                      width: "649.516px",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      className="WImageContainer w1"
                      onClick={() => switchWallpaper("w1", "1")}
                    >
                      <img src={W1} />
                    </div>
                    <div
                      className="WImageContainer w2"
                      onClick={() => switchWallpaper("w2", "2")}
                    >
                      <img src={W2} />
                    </div>
                    <div
                      className="WImageContainer w3"
                      onClick={() => switchWallpaper("w3", "3")}
                    >
                      <img src={W3} />
                    </div>
                    <div
                      className="WImageContainer w4"
                      onClick={() => switchWallpaper("w4", "4")}
                    >
                      <img src={W4} />
                    </div>
                    <div
                      className="WImageContainer w5"
                      onClick={() => switchWallpaper("w5", "5")}
                    >
                      <img src={W5} />
                    </div>
                    <div
                      className="WImageContainer w6"
                      onClick={() => switchWallpaper("w6", "6")}
                    >
                      <img src={W6} />
                    </div>
                  </div>
                  <div style={{ marginTop: "20px", marginLeft: "auto" }}>
                    <div className="WallpaperMenuSection">
                      <p style={{ marginRight: "7px" }}>Select image...</p>
                      <i className="fa-regular fa-image"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Appearance">
                <div className="HeaderAppearance">
                  <p className="font-bold" style={{ marginBottom: "30px" }}>
                    Header
                  </p>
                  <div style={{ width: "649.516px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "40px",
                      }}
                    >
                      <p>
                        Enable ProMode{" "}
                        {shellTheme === "WhiteSur" &&
                          "(This theme doesn't support ProMode.)"}
                      </p>
                      <div
                        className={`Toggle ${
                          shellTheme === "WhiteSur" ? "whitesur" : ""
                        } ${header.proMode ? "active" : ""}`}
                        style={{
                          opacity: shellTheme === "WhiteSur" ? "0.5" : "1",
                          pointerEvents:
                            shellTheme === "WhiteSur" ? "none" : "all",
                        }}
                        onClick={() => dispatch(setProMode(!header.proMode))}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Appearance">
                <div className="Themes">
                  <p className="font-bold" style={{ marginBottom: "30px" }}>
                    Appearances
                  </p>
                  <div style={{ width: "649.516px" }}>
                    <div className="ThemesMenu">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <i
                          className="fa-regular fa-arrow-pointer"
                          style={{ marginRight: "7px" }}
                        ></i>
                        <p>Cursor</p>
                      </div>
                      <div
                        className="ThemesMenuSection"
                        onClick={() => showCursorMenu(true)}
                      >
                        <p style={{ marginRight: "7px" }}>Default</p>
                        <i className="fa-regular fa-chevron-down"></i>
                      </div>
                      <ActMenu
                        style={{
                          zIndex: "1",
                          width: "200px",
                          transform: "translate(450px, 30px)",
                        }}
                        className={cursorMenu ? "active" : ""}
                        ref={cursorMenuRef}
                      >
                        <ActMenuSelector
                          title="Default"
                          active
                        ></ActMenuSelector>
                      </ActMenu>
                    </div>
                    <div className="ThemesMenu">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <i
                          className="fa-regular fa-icons"
                          style={{ marginRight: "7px" }}
                        ></i>
                        <p>Icons</p>
                      </div>
                      <div
                        className="ThemesMenuSection"
                        onClick={() => showIconsMenu(true)}
                      >
                        <p style={{ marginRight: "7px" }}>
                          {appearanceReducer.iconTheme}
                        </p>
                        <i className="fa-regular fa-chevron-down"></i>
                      </div>
                      <ActMenu
                        style={{
                          zIndex: "1",
                          width: "200px",
                          transform: "translate(450px, 30px)",
                        }}
                        className={iconsMenu ? "active" : ""}
                        ref={iconsMenuRef}
                      >
                        {appearanceReducer.iconTheme === "Default" ? (
                          <ActMenuSelector
                            title="Default"
                            active
                            onClick={() => changeIcons("Default")}
                          ></ActMenuSelector>
                        ) : (
                          <ActMenuSelector
                            title="Default"
                            onClick={() => changeIcons("Default")}
                          ></ActMenuSelector>
                        )}
                        {appearanceReducer.iconTheme ===
                        "WhiteSur-icon-theme" ? (
                          <ActMenuSelector
                            title="WhiteSur-icon-theme"
                            active
                            onClick={() => changeIcons("WhiteSur-icon-theme")}
                          ></ActMenuSelector>
                        ) : (
                          <ActMenuSelector
                            title="WhiteSur-icon-theme"
                            onClick={() => changeIcons("WhiteSur-icon-theme")}
                          ></ActMenuSelector>
                        )}
                      </ActMenu>
                    </div>
                    <div className="ThemesMenu">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <i
                          className="fa-solid fa-font-case"
                          style={{ marginRight: "7px" }}
                        ></i>
                        <p>Fonts</p>
                      </div>
                      <div
                        className="ThemesMenuSection"
                        onClick={() => showFontsMenu(true)}
                      >
                        <p style={{ marginRight: "7px" }}>
                          {settingsReducer.fontFamily}
                        </p>
                        <i className="fa-regular fa-chevron-down"></i>
                      </div>
                      <ActMenu
                        style={{
                          zIndex: "1",
                          width: "200px",
                          transform: "translate(450px, 30px)",
                        }}
                        className={fontsMenu ? "active" : ""}
                        ref={fontsMenuRef}
                      >
                        {settingsReducer.fontFamily === "OptimisticDisplay" ? (
                          <ActMenuSelector
                            title="OptimisticDisplay"
                            active
                            onClick={() => changeFont("OptimisticDisplay")}
                          ></ActMenuSelector>
                        ) : (
                          <ActMenuSelector
                            title="OptimisticDisplay"
                            onClick={() => changeFont("OptimisticDisplay")}
                          ></ActMenuSelector>
                        )}
                        {settingsReducer.fontFamily === "System" ? (
                          <ActMenuSelector
                            title="System"
                            active
                            onClick={() => changeFont("System")}
                          ></ActMenuSelector>
                        ) : (
                          <ActMenuSelector
                            title="System"
                            onClick={() => changeFont("System")}
                          ></ActMenuSelector>
                        )}
                      </ActMenu>
                    </div>
                    <div className="ThemesMenu">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <i
                          className="fa-solid fa-browser"
                          style={{ marginRight: "7px" }}
                        ></i>
                        <p>Shell</p>
                      </div>
                      <div
                        className="ThemesMenuSection"
                        onClick={() => showShellMenu(true)}
                      >
                        <p style={{ marginRight: "7px" }}>{shellTheme}</p>
                        <i className="fa-regular fa-chevron-down"></i>
                      </div>
                      <ActMenu
                        style={{
                          zIndex: "1",
                          width: "200px",
                          transform: "translate(450px, 30px)",
                        }}
                        className={shellMenu ? "active" : ""}
                        ref={shellMenuRef}
                      >
                        {shellTheme === "Breeze" ? (
                          <ActMenuSelector
                            title="Breeze"
                            active
                            onClick={() => switchShell("Breeze")}
                          ></ActMenuSelector>
                        ) : (
                          <ActMenuSelector
                            title="Breeze"
                            onClick={() => switchShell("Breeze")}
                          ></ActMenuSelector>
                        )}
                        {shellTheme === "WhiteSur" ? (
                          <ActMenuSelector
                            title="WhiteSur (beta)"
                            active
                            onClick={() => switchShell("WhiteSur")}
                          ></ActMenuSelector>
                        ) : (
                          <ActMenuSelector
                            title="WhiteSur (beta)"
                            onClick={() => switchShell("WhiteSur")}
                          ></ActMenuSelector>
                        )}
                      </ActMenu>
                    </div>
                    <div className="ThemesMenu">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <i
                          className="fa-regular fa-volume"
                          style={{ marginRight: "7px" }}
                        ></i>
                        <p>Sound</p>
                      </div>
                      <div
                        className="ThemesMenuSection"
                        onClick={() => showSoundMenu(true)}
                      >
                        <p style={{ marginRight: "7px" }}>Oxygen</p>
                        <i className="fa-regular fa-chevron-down"></i>
                      </div>
                      <ActMenu
                        style={{
                          zIndex: "1",
                          width: "200px",
                          transform: "translate(450px, 30px)",
                        }}
                        className={soundMenu ? "active" : ""}
                        ref={soundMenuRef}
                      >
                        <ActMenuSelector
                          title="Oxygen"
                          active
                        ></ActMenuSelector>
                      </ActMenu>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        case "Widgets":
          return (
            <div className="WidgetsWrapper">
              <div className="Widgets">
                <div className="CurrentWidgets">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "30px",
                    }}
                  >
                    <p className="font-bold">Current widgets</p>
                    <i className="fa-regular fa-plus WidgetsButton"></i>
                  </div>
                  <div style={{ width: "649.516px", display: "flex" }}>
                    <div className="WidgetsContainer">
                      <div
                        className={`ClockWidget active ${widget.clock.style}`}
                      >
                        <div
                          className="Hour"
                          style={{
                            transform: "rotateZ(300deg)",
                          }}
                        />
                        <div
                          className="Min"
                          style={{
                            transform: "rotateZ(60deg)",
                          }}
                        />
                        <span className="Number twelve"></span>
                        <span className="Number three"></span>
                        <span className="Number six"></span>
                        <span className="Number nine"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        case "Notifications":
          return (
            <div className="NotificationsWrapper">
              <div className="Notifications">
                <div style={{ width: "649.516px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "40px",
                    }}
                  >
                    <p className="font-bold">Do Not Disturb</p>
                    <div
                      className={`Toggle ${
                        shellTheme === "WhiteSur" ? "whitesur" : ""
                      } ${settingsReducer.notifications ? "active" : ""}`}
                      onClick={toggleDoNotDisturb}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        case "Displays":
          return (
            <div className="DisplaysWrapper">
              <div className="Displays">
                <div className="BuiltInDisplay">
                  <p className="font-bold" style={{ marginBottom: "30px" }}>
                    Built-in display
                  </p>
                  <div
                    style={{
                      width: "649.516px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="BiDMenu">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <i
                          className="fa-regular fa-image-landscape"
                          style={{ marginRight: "7px" }}
                        ></i>
                        <p>Orientation</p>
                      </div>
                      <div
                        className="BiDMenuSection"
                        onClick={() => showOrientationMenu(true)}
                      >
                        <p style={{ marginRight: "7px" }}>Landscape</p>
                        <i className="fa-regular fa-chevron-down"></i>
                      </div>
                      <ActMenu
                        style={{
                          zIndex: "1",
                          width: "200px",
                          transform: "translate(450px, 30px)",
                        }}
                        className={orientationMenu ? "active" : ""}
                        ref={orientationMenuRef}
                      >
                        <ActMenuSelector
                          title="Landscape"
                          active
                        ></ActMenuSelector>
                        <ActMenuSelector title="Portrait"></ActMenuSelector>
                      </ActMenu>
                    </div>
                    <div className="BiDMenu">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <i
                          className="fa-regular fa-expand-wide"
                          style={{ marginRight: "7px" }}
                        ></i>
                        <p>Resolution</p>
                      </div>
                      <div
                        className="BiDMenuSection"
                        onClick={() => showResolutionMenu(true)}
                      >
                        <p style={{ marginRight: "7px" }}>
                          {window.screen.width} &times; {window.screen.height}{" "}
                          &#40;16:9&#41;
                        </p>
                        <i className="fa-regular fa-chevron-down"></i>
                      </div>
                      <ActMenu
                        style={{
                          zIndex: "1",
                          width: "200px",
                          transform: "translate(450px, 30px)",
                        }}
                        className={resolutionMenu ? "active" : ""}
                        ref={resolutionMenuRef}
                      >
                        <ActMenuSelector
                          title={`${window.screen.width} \u00D7 ${window.screen.height} (16:9)`}
                          active
                        ></ActMenuSelector>
                      </ActMenu>
                    </div>
                    <div className="BiDMenu">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <i
                          className="fa-regular fa-arrows-rotate"
                          style={{ marginRight: "7px" }}
                        ></i>
                        <p>Refresh Rate</p>
                      </div>
                      <div
                        className="BiDMenuSection"
                        onClick={() => showRefreshRateMenu(true)}
                      >
                        <p style={{ marginRight: "7px" }}>60.00 Hz</p>
                        <i className="fa-regular fa-chevron-down"></i>
                      </div>
                      <ActMenu
                        style={{
                          zIndex: "1",
                          width: "200px",
                          transform: "translate(450px, 30px)",
                        }}
                        className={refreshRateMenu ? "active" : ""}
                        ref={refreshRateMenuRef}
                      >
                        <ActMenuSelector
                          title="60.00 Hz"
                          active
                        ></ActMenuSelector>
                        <ActMenuSelector title="50.00 Hz"></ActMenuSelector>
                        <ActMenuSelector title="40.00 Hz"></ActMenuSelector>
                        <ActMenuSelector title="30.00 Hz"></ActMenuSelector>
                      </ActMenu>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        case "Users":
          return (
            <div className="UsersWrapper">
              <div className="Users">
                <div
                  style={{
                    width: "649.516px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="UserCard">
                    <div className="UserInfo">
                      <Avatar size={70} />
                      <div style={{ marginLeft: "15px" }}>
                        <p className="UserName">{settingsReducer.user.name}</p>
                        <p className="UserRole">{settingsReducer.user.role}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="UserItem"
                    onClick={() => setUsersTab("general")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i className="fa-regular fa-gear UserIcon"></i>
                      <p>General</p>
                    </div>
                    <i className="fa-regular fa-chevron-right"></i>
                  </div>
                  <div
                    className="UserItem"
                    onClick={() => setUsersTab("security")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i className="fa-regular fa-lock UserIcon"></i>
                      <p>Security</p>
                    </div>
                    <i className="fa-regular fa-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
          );
        case "Date & Time":
          return (
            <div className="DateNTimeWrapper">
              <div className="DateNTime">
                <div style={{ width: "649.516px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "40px",
                    }}
                  >
                    <p className="font-bold">24-hour time</p>
                    <div
                      className={`Toggle ${
                        shellTheme === "WhiteSur" ? "whitesur" : ""
                      } ${settingsReducer.hour12 ? "" : "active"}`}
                      onClick={() =>
                        dispatch(toggle12Hour(!settingsReducer.hour12))
                      }
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        case "About":
          return (
            <div className="AboutWrapper">
              <div className="About">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {settingsReducer.themeLight ? (
                    <img
                      src={LogoL}
                      width={"331.133"}
                      height={140}
                      className="AboutLogo"
                    />
                  ) : (
                    <img
                      src={LogoD}
                      width={"331.133"}
                      height={140}
                      className="AboutLogo"
                    />
                  )}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "10px",
                    }}
                  >
                    <div
                      className="AboutMenu"
                      onClick={() => allowEditDeviceName(!editDeviceName)}
                    >
                      <p>Device Name</p>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <p className="BlurText" style={{ marginRight: "15px" }}>
                          {settingsReducer.deviceName}
                        </p>
                        <i
                          className={`fa-regular fa-chevron-right ${
                            editDeviceName ? "rotated" : ""
                          }`}
                        ></i>
                      </div>
                    </div>
                    <div
                      className={`AboutMenu EditName ${
                        editDeviceName ? "active" : ""
                      }`}
                    >
                      <input
                        className="EditNameInput"
                        type="text"
                        placeholder={settingsReducer.deviceName}
                        onKeyUp={submitDeviceName}
                      />
                    </div>
                    <div className="AboutMenu">
                      <p>System Name</p>
                      <p className="BlurText">BreezeOS</p>
                    </div>
                    <div className="AboutMenu">
                      <p>System Version</p>
                      <p className="BlurText">2.0.0</p>
                    </div>
                    <div className="AboutMenu">
                      <p>Shell</p>
                      <p className="BlurText">{shellTheme}</p>
                    </div>
                    <div className="AboutMenu">
                      <p>Kernel</p>
                      <p className="BlurText">GNU/Linux 6.2.1 x86_64</p>
                    </div>
                    <div className="AboutMenu">
                      <p>Memory</p>
                      <p className="BlurText">
                        {navigator.hardwareConcurrency} GB
                      </p>
                    </div>
                    <div className="AboutMenu">
                      <p>Processor</p>
                      <p className="BlurText">
                        Intel&reg; Core&trade; i3-6100 CPU @ 3.70GHz &times; 4
                      </p>
                    </div>
                    <div className="AboutMenu">
                      <p>Graphics</p>
                      <p className="BlurText">
                        Mesa Intel&reg; HD Graphics 530 &#40;SKL GT2&#41;
                      </p>
                    </div>
                    <div className="AboutMenu">
                      <p>Disk Capacity</p>
                      <p className="BlurText">128.0 GB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        default:
          return <p>Nothing in this section.</p>;
      }
    }

    const [min, isMin] = useState(false);
    const [wrongPasswordAni, setWrongPasswordAni] = useState(false);

    function minimize() {
      document
        .getElementsByClassName("settings")[0]
        .classList.toggle("minimize");
      isMin(!min);
    }

    function submitPassword() {
      dispatch(setPasswordDisable(true));
      dispatch(setWrongPassword(false));
      setTimeout(() => {
        dispatch(setPasswordDisable(false));
        dispatch(setWrongPassword(true));
        setWrongPasswordAni(true);
      }, 4000);
      setTimeout(() => setWrongPasswordAni(false), 4550);
    }

    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        dispatch(cancelPassword());
      }
    });

    const cancel = () => {
      dispatch(setInactive());
      dispatch(cancelPassword());
    };

    function switchSecurity(e) {
      showSecurityMenu(false);
      dispatch(setSecurity(e));
    }

    const wp = useSelector((state) => state.wifipassword);

    const [userName, setUserName] = useState("");

    function switchUsersTab() {
      switch (usersTab) {
        case "general":
          return (
            <>
              <Avatar size={90} />
              <div className="UserInfo">
                <input
                  placeholder={settingsReducer.user.name}
                  value={userName}
                  onInput={(e) => setUserName(e.target.value)}
                  className="Input"
                />
              </div>
              <div
                className={`Button ${!userName && "disabled"}`}
                onClick={() => {
                  setUsersTab("");
                  dispatch(setName(userName));
                }}
              >
                <p>OK</p>
              </div>
            </>
          );
      }
    }

    return (
      <>
        {maximumExceeded ? (
          <div className="MaximumExceededBox">
            <div className="WindowTopBar">
              <p className="WindowTopBarTitle">Error!</p>
              <div className="WindowTopBarInteractionContainer">
                <div
                  className="WindowTopBarInteraction close"
                  onClick={() => displayMaximumExceeded(false)}
                >
                  <i className="fa-solid fa-xmark fa-lg"></i>
                </div>
              </div>
            </div>
            <div className="WindowBodyDefault">
              <p className="WindowBodyContent">Maximum characters exceeded</p>
              <div className="WindowBodyButton">
                <button
                  className="Button"
                  onClick={() => displayMaximumExceeded(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <TopBar title="Settings" onDblClick={minimize}>
          <div className="TabBarWrapper" style={{ width: "100%" }}>
            <div
              className="TabBar"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div
                className="TabBarItem"
                style={{ width: "200px", flexDirection: "row-reverse" }}
              >
                <div className="TabBarInteraction">
                  <i className="fa-regular fa-magnifying-glass"></i>
                </div>
              </div>
              <div
                className="TabBarItem TabBarSettingsName"
                style={
                  settings == "Wi-Fi"
                    ? { justifyContent: "space-between" }
                    : { justifyContent: "center" }
                }
              >
                {settings == "Wi-Fi" ? (
                  <>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <p>{settings}</p>
                    </div>
                    <div
                      className={`Toggle ${
                        shellTheme === "WhiteSur" ? "whitesur" : ""
                      } ${settingsReducer.wifi ? "active" : ""}`}
                      onClick={() => dispatch(toggleWifi())}
                    ></div>
                  </>
                ) : settings == "Bluetooth" ? (
                  <>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <p>{settings}</p>
                    </div>
                    <div
                      className={`Toggle ${
                        shellTheme === "WhiteSur" ? "whitesur" : ""
                      } ${settingsReducer.bluetooth ? "active" : ""}`}
                      onClick={() => dispatch(toggleBluetooth())}
                    ></div>
                  </>
                ) : (
                  <p>{settings}</p>
                )}
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
          <div className={`BlackScr ${shareWifi && "active"}`}>
            <div
              className={`WifiSharing ${
                shellTheme === "WhiteSur" ? "whitesur" : ""
              } ${shareWifi ? "active" : ""}`}
            >
              <div className="WindowTopBar">
                <p className="WindowTopBarTitle">Wi-Fi Sharing</p>
                <div className="WindowTopBarInteractionContainer">
                  <div
                    className="WindowTopBarInteraction close"
                    onClick={() => setShareWifi(false)}
                  >
                    <i className="fa-solid fa-xmark fa-lg"></i>
                  </div>
                </div>
              </div>
              <div className="WindowBodyDefault">
                <div className="WindowBodyContent">
                  <p style={{ marginBottom: "30px" }} className="font-bold">
                    BreezeOS
                  </p>
                  <img width="auto" height={300} src={Wifi1} />
                </div>
              </div>
            </div>
          </div>
          <div className={`BlackScr ${wp.active && "active"}`}>
            <div
              className={`InsertWifiPassword ${
                shellTheme === "WhiteSur" ? "whitesur" : ""
              } ${wp.active ? "active" : ""}`}
            >
              <div className="WindowBodyDefault">
                <div className="WindowBodyContent">
                  <div className="WindowBodyIcon">
                    <i className="fa-regular fa-key"></i>
                  </div>
                  <div style={{ marginLeft: "10px", width: "100%" }}>
                    <p className="font-bold" style={{ fontSize: "17px" }}>
                      Connect to Wi-Fi "{wp.passwordFor}"
                    </p>
                    <div
                      className={`PasswordContainer ${
                        wp.disabled ? "disabled" : ""
                      }`}
                    >
                      <input
                        type={wp.isShow ? "text" : "password"}
                        id="password"
                        placeholder="Password"
                        autoComplete={false}
                        spellCheck={false}
                        value={wp.value}
                        onInput={(e) =>
                          dispatch(setInputPassword(e.target.value))
                        }
                        className={`InputPassword ${
                          wp.isWrong ? "wrongPassword" : ""
                        } ${wrongPasswordAni ? "activeAnimation" : ""}`}
                      />
                      <i
                        className={`fa-regular ${
                          wp.isShow ? "fa-eye-slash" : "fa-eye"
                        } displayPassword ${wp.value == "" ? "disabled" : ""}`}
                        onClick={() =>
                          wp.isShow
                            ? dispatch(displayPassword(false))
                            : dispatch(displayPassword(true))
                        }
                      ></i>
                    </div>
                  </div>
                </div>
                <div className={`WindowBodyButton`}>
                  <button
                    className={`Button ${wp.disabled ? "disabled" : ""}`}
                    onClick={() => dispatch(cancelPassword())}
                  >
                    Cancel
                  </button>
                  <button
                    className={`Button ${
                      wp.value.length < 8 ? "disabled" : ""
                    } ${wp.disabled ? "disabled" : ""}`}
                    onClick={submitPassword}
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={`BlackScr ${nw.active && "active"}`}>
            <div
              className={`ConnectOtherNetworks ${
                shellTheme === "WhiteSur" ? "whitesur" : ""
              } ${nw.active ? "active" : ""}`}
            >
              <div className="WindowBodyDefault">
                <div className="WindowBodyContent">
                  <div className="WindowBodyIcon">
                    <i className="fa-regular fa-wifi"></i>
                  </div>
                  <div style={{ marginLeft: "10px", width: "100%" }}>
                    <p className="font-bold" style={{ fontSize: "17px" }}>
                      Connect to Hidden Networks
                    </p>
                    <p
                      className="font-normal"
                      style={{ marginTop: "7px", fontSize: "11px" }}
                    >
                      Enter network information that you wish to connect to.
                    </p>
                    <div
                      className={`InfoContainer ${
                        wp.disabled ? "disabled" : ""
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Network Name"
                        autoComplete={false}
                        spellCheck={false}
                        value={nw.name}
                        onInput={(e) => dispatch(setWifiName(e.target.value))}
                        className={`Input ${wp.isWrong ? "wrongInfo" : ""} ${
                          wrongPasswordAni ? "activeAnimation" : ""
                        }`}
                      />
                      <div
                        className={`Input ${wp.isWrong ? "wrongInfo" : ""} ${
                          wrongPasswordAni ? "activeAnimation" : ""
                        }`}
                        onClick={() => showSecurityMenu(true)}
                      >
                        <p>Security: {nw.security}</p>
                        <i className="fa-regular fa-chevron-down"></i>
                        <ActMenu
                          style={{
                            zIndex: "1",
                            width: "388px",
                            top: "27px",
                            right: "0",
                          }}
                          className={securityMenu ? "active" : ""}
                          ref={securityMenuRef}
                        >
                          {nw.security === "None" ? (
                            <ActMenuSelector
                              title="None"
                              active
                              onClick={() => switchSecurity("None")}
                            ></ActMenuSelector>
                          ) : (
                            <ActMenuSelector
                              title="None"
                              onClick={() => switchSecurity("None")}
                            ></ActMenuSelector>
                          )}
                          {nw.security === "WEP" ? (
                            <ActMenuSelector
                              title="WEP"
                              active
                              onClick={() => switchSecurity("WEP")}
                            ></ActMenuSelector>
                          ) : (
                            <ActMenuSelector
                              title="WEP"
                              onClick={() => switchSecurity("WEP")}
                            ></ActMenuSelector>
                          )}
                          {nw.security === "WPA" ? (
                            <ActMenuSelector
                              title="WPA"
                              active
                              onClick={() => switchSecurity("WPA")}
                            ></ActMenuSelector>
                          ) : (
                            <ActMenuSelector
                              title="WPA"
                              onClick={() => switchSecurity("WPA")}
                            ></ActMenuSelector>
                          )}
                          {nw.security === "WPA2" ? (
                            <ActMenuSelector
                              title="WPA2"
                              active
                              onClick={() => switchSecurity("WPA2")}
                            ></ActMenuSelector>
                          ) : (
                            <ActMenuSelector
                              title="WPA2"
                              onClick={() => switchSecurity("WPA2")}
                            ></ActMenuSelector>
                          )}
                          {nw.security === "WPA Enterprise" ? (
                            <ActMenuSelector
                              title="WPA Enterprise"
                              active
                              onClick={() => switchSecurity("WPA Enterprise")}
                            ></ActMenuSelector>
                          ) : (
                            <ActMenuSelector
                              title="WPA Enterprise"
                              onClick={() => switchSecurity("WPA Enterprise")}
                            ></ActMenuSelector>
                          )}
                          {nw.security === "WPA2 Enterprise" ? (
                            <ActMenuSelector
                              title="WPA2 Enterprise"
                              active
                              onClick={() => switchSecurity("WPA2 Enterprise")}
                            ></ActMenuSelector>
                          ) : (
                            <ActMenuSelector
                              title="WPA2 Enterprise"
                              onClick={() => switchSecurity("WPA2 Enterprise")}
                            ></ActMenuSelector>
                          )}
                          {nw.security === "WPA3 Enterprise" ? (
                            <ActMenuSelector
                              title="WPA3 Enterprise"
                              active
                              onClick={() => switchSecurity("WPA3 Enterprise")}
                            ></ActMenuSelector>
                          ) : (
                            <ActMenuSelector
                              title="WPA3 Enterprise"
                              onClick={() => switchSecurity("WPA3 Enterprise")}
                            ></ActMenuSelector>
                          )}
                        </ActMenu>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type={wp.isShow ? "text" : "password"}
                          id="password"
                          placeholder="Password"
                          autoComplete={false}
                          spellCheck={false}
                          value={wp.value}
                          onInput={(e) =>
                            dispatch(setInputPassword(e.target.value))
                          }
                          className={`Input ${wp.isWrong ? "wrongInfo" : ""} ${
                            wrongPasswordAni ? "activeAnimation" : ""
                          }`}
                          style={{ margin: "0" }}
                        />
                        <i
                          className={`fa-regular ${
                            wp.isShow ? "fa-eye-slash" : "fa-eye"
                          } displayPassword ${
                            wp.value == "" ? "disabled" : ""
                          }`}
                          onClick={() =>
                            wp.isShow
                              ? dispatch(displayPassword(false))
                              : dispatch(displayPassword(true))
                          }
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`WindowBodyButton`}>
                  <button
                    className={`Button ${wp.disabled ? "disabled" : ""}`}
                    onClick={cancel}
                  >
                    Cancel
                  </button>
                  <button
                    className={`Button ${
                      wp.value.length < 8 ? "disabled" : ""
                    } ${wp.disabled ? "disabled" : ""}`}
                    onClick={submitPassword}
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={`BlackScr ${usersTab !== "" && "active"}`}>
            <div
              className={`UsersBox ${
                shellTheme === "WhiteSur" ? "whitesur" : ""
              } ${usersTab !== "" && "active"}`}
            >
              <div className="WindowTopBar">
                <p className="WindowTopBarTitle"></p>
                <div className="WindowTopBarInteractionContainer">
                  <div
                    className="WindowTopBarInteraction close"
                    onClick={() => setUsersTab("")}
                  >
                    <i className="fa-solid fa-xmark fa-lg"></i>
                  </div>
                </div>
              </div>
              <div className="WindowBodyDefault">
                <div className="WindowBodyContent">{switchUsersTab()}</div>
              </div>
            </div>
          </div>
          <div
            className={`Settings ${
              shellTheme === "WhiteSur" ? "whitesur" : ""
            }`}
          >
            <div className="SettingsSection">
              <div style={{ width: "295px", height: "100%" }}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      maxHeight: "100%",
                      overflowY: "auto",
                    }}
                  >
                    {navItems.map((e) => (
                      <div className="NavPanel">
                        {e.map((i) => (
                          <div
                            className={`DropdownMenu ${i.active && "active"}`}
                            onMouseDown={i.onClick}
                          >
                            <i className={i.icon}></i>
                            <p className="DropdownTitle">{i.name}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="SettingsContainer">
                <div className="SettingsContainerInside">{switchTab()}</div>
              </div>
            </div>
          </div>
        </WindowBody>
      </>
    );
  };

  return (
    <div className="SettingsWindow">
      <div className="Window settings" key={Math.random()}>
        <SettingsWindow />
      </div>
    </div>
  );
}
