import { useState, useEffect, useRef } from "react";
import { setSettings } from "@/store/reducers/settings";
import {
  insertPasswordFor,
  cancelPassword,
  setInputPassword,
  setPasswordDisable,
  displayPassword,
  setWrongPassword,
} from "@/store/reducers/wifipassword";
import {
  toggleActive,
  setSecurity,
  setWifiName,
  setInactive,
} from "@/store/reducers/newwifi";
import { toggleLightMode } from "@/store/reducers/appearance";
import {
  toggleAirplaneMode,
  toggleWifi,
  toggleNotifications,
  toggleBluetooth,
  setDeviceName,
  setFontFamily,
  setName,
  setAnimationsReduced,
  setColorInverted,
  setBatterySaver,
  setTransparencyReduced,
} from "@/store/reducers/settings";
import { toggle12Hour, setSeconds } from "@/store/reducers/time";
import { changeWallpaper } from "@/store/reducers/wallpaper";
import "@/components/utils/window/Window.scss";
import TopBar from "@/components/utils/window/TopBar";
import WindowBody from "@/components/utils/window/WindowBody";
import "./assets/settings.scss";
import TopBarInteraction from "@/components/utils/window/TopBarInteraction";
import ActMenu, { ActMenuSelector } from "@/components/utils/menu/index";
import Image1 from "./assets/dark.png";
import Image2 from "./assets/light.png";
import LogoD from "@/images/logo-d.svg";
import LogoL from "@/images/logo-l.svg";
import W1 from "@/components/default.jpg";
import W2 from "@/components/52697.jpg";
import W3 from "@/components/52496.jpg";
import W4 from "@/components/52791.jpg";
import W5 from "@/components/52532.jpg";
import W6 from "@/components/52544.jpg";
import W7 from "@/components/breezeos-1.jpg";
import W8 from "@/components/breezeos-2.jpg";
import QRD from "./assets/qr-d.png";
import QRL from "./assets/qr-l.png";
import { changeShell } from "@/store/reducers/shell";
import { setHeaderType, setProMode, setWidth } from "@/store/reducers/header";
import Avatar from "@/components/Avatar";
import Toggle from "@/components/utils/toggle";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Hammer from "react-hammerjs";
import { useBattery } from "react-use";
import Checkbox from "@/components/utils/checkbox";
import { setTemperature } from "@/store/reducers/weather";
import WidgetType from "@/components/WidgetType";
import {
  hideApp,
  maximizeApp,
  minimizeApp,
  quitApp,
} from "@/store/reducers/apps";
import { setBlocks } from "@/store/reducers/msgbox";

export default function Settings({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const appIsActive = useAppSelector((state) => state.apps.appIsActive);
  const isActive = appIsActive[id].status === "active";
  const isHide = appIsActive[id].status === "hide";
  const isMinimized = appIsActive[id].minimized;
  const [t, i18n] = useTranslation();
  const batteryState = useBattery();
  const batteryPercent = useAppSelector((state) => state.system.battery.level);
  const batteryIsCharging = useAppSelector(
    (state) => state.system.battery.charging
  );
  const system = useAppSelector((state) => state.system);
  const settingsReducer = useAppSelector((state) => state.settings);
  const isHour12 = useAppSelector((state) => state.time.hour12);
  const isSecondsEnabled = useAppSelector((state) => state.time.seconds);
  const shellTheme = useAppSelector((state) => state.shell.theme);
  const wifis = useAppSelector((state) => state.settings.wifiList);
  const settings = useAppSelector((state) => state.settings.settings);
  const header = useAppSelector((state) => state.header);
  const widget = useAppSelector((state) => state.widget);
  const wallpaper = useAppSelector((state) => state.wallpaper.img);
  const weather = useAppSelector((state) => state.weather);

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
        onClick: () => dispatch(setSettings("Wi-Fi")),
      },
      {
        name: "Bluetooth",
        icon: "fa-regular fa-bluetooth",
        onClick: () => dispatch(setSettings("Bluetooth")),
      },
      {
        name: "Network",
        icon: "fa-regular fa-globe",
        onClick: () => dispatch(setSettings("Network")),
      },
    ],
    [
      {
        name: "Appearance",
        icon: "fa-regular fa-paintbrush",
        onClick: () => dispatch(setSettings("Appearance")),
      },
      {
        name: "Widgets",
        icon: "fa-regular fa-shapes",
        onClick: () => dispatch(setSettings("Widgets")),
      },
      {
        name: "Notifications",
        icon: "fa-regular fa-bell",
        onClick: () => dispatch(setSettings("Notifications")),
      },
      {
        name: "Search",
        icon: "fa-regular fa-magnifying-glass",
        onClick: () => dispatch(setSettings("Search")),
      },
    ],
    [
      {
        name: "Apps",
        icon: "fa-regular fa-grid-2",
        onClick: () => dispatch(setSettings("Apps")),
      },
      {
        name: "Privacy",
        icon: "fa-regular fa-lock",
        onClick: () => dispatch(setSettings("Privacy")),
      },
      {
        name: "Security",
        icon: "fa-solid fa-shield-halved",
        onClick: () => dispatch(setSettings("Security")),
      },
      {
        name: "Online Accounts",
        icon: "fa-regular fa-at",
        onClick: () => dispatch(setSettings("Online Accounts")),
      },
      {
        name: "Share",
        icon: "fa-regular fa-share-nodes",
        onClick: () => dispatch(setSettings("Share")),
      },
    ],
    [
      {
        name: "Updates",
        icon: "fa-regular fa-rotate",
        onClick: () => dispatch(setSettings("Updates")),
      },
      {
        name: "Sound",
        icon: "fa-regular fa-volume",
        onClick: () => dispatch(setSettings("Sound")),
      },
      {
        name: "Battery",
        icon: "fa-regular fa-battery-full",
        onClick: () => dispatch(setSettings("Battery")),
      },
      {
        name: "Displays",
        icon: "fa-regular fa-desktop",
        onClick: () => dispatch(setSettings("Displays")),
      },
      {
        name: "Mouse & Touchpad",
        icon: "fa-regular fa-computer-mouse",
        onClick: () => dispatch(setSettings("Mouse & Touchpad")),
      },
      {
        name: "Keyboard",
        icon: "fa-regular fa-keyboard",
        onClick: () => dispatch(setSettings("Keyboard")),
      },
      {
        name: "Printer",
        icon: "fa-regular fa-print",
        onClick: () => dispatch(setSettings("Printer")),
      },
    ],
    [
      {
        name: "Users",
        icon: "fa-regular fa-user",
        onClick: () => dispatch(setSettings("Users")),
      },
      {
        name: "Region & Language",
        icon: "fa-regular fa-language",
        onClick: () => dispatch(setSettings("Region & Language")),
      },
      {
        name: "Accessibility",
        icon: "fa-regular fa-universal-access",
        onClick: () => dispatch(setSettings("Accessibility")),
      },
      {
        name: "Date & Time",
        icon: "fa-regular fa-clock",
        onClick: () => dispatch(setSettings("Date & Time")),
      },
      {
        name: "About",
        icon: "fa-regular fa-circle-info",
        onClick: () => dispatch(setSettings("About")),
      },
    ],
  ];

  const nw = useAppSelector((state) => state.newwifi);
  const [cursorMenu, showCursorMenu] = useState<boolean>(false);
  const [fontsMenu, showFontsMenu] = useState<boolean>(false);
  const [iconsMenu, showIconsMenu] = useState<boolean>(false);
  const [shellMenu, showShellMenu] = useState<boolean>(false);
  const [soundMenu, showSoundMenu] = useState<boolean>(false);
  const [orientationMenu, showOrientationMenu] = useState<boolean>(false);
  const [resolutionMenu, showResolutionMenu] = useState<boolean>(false);
  const [refreshRateMenu, showRefreshRateMenu] = useState<boolean>(false);
  const [languageMenu, showLanguageMenu] = useState<boolean>(false);
  const [securityMenu, showSecurityMenu] = useState<boolean>(false);
  const [editDeviceName, allowEditDeviceName] = useState<boolean>(false);

  function useOutsideCursorMenu(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showCursorMenu(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const cursorMenuRef = useRef(null);
  useOutsideCursorMenu(cursorMenuRef);

  function useOutsideIconsMenu(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showIconsMenu(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const iconsMenuRef = useRef(null);
  useOutsideIconsMenu(iconsMenuRef);

  function useOutsideShellMenu(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showShellMenu(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const shellMenuRef = useRef(null);
  useOutsideShellMenu(shellMenuRef);

  function useOutsideSoundMenu(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showSoundMenu(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const soundMenuRef = useRef(null);
  useOutsideSoundMenu(soundMenuRef);

  function useOutsideFontsMenu(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showFontsMenu(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const fontsMenuRef = useRef(null);
  useOutsideFontsMenu(fontsMenuRef);

  function useOutsideOrientationMenu(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showOrientationMenu(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const orientationMenuRef = useRef(null);
  useOutsideOrientationMenu(orientationMenuRef);

  function useOutsideResolutionMenu(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showResolutionMenu(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const resolutionMenuRef = useRef(null);
  useOutsideResolutionMenu(resolutionMenuRef);

  function useOutsideRRMenu(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showRefreshRateMenu(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const refreshRateMenuRef = useRef(null);
  useOutsideRRMenu(refreshRateMenuRef);

  function useOutsideLanguageMenu(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showLanguageMenu(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const languageMenuRef = useRef(null);
  useOutsideLanguageMenu(languageMenuRef);

  function useOutsideSecurityMenu(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showSecurityMenu(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const securityMenuRef = useRef(null);
  useOutsideSecurityMenu(securityMenuRef);

  const [maximumExceeded, displayMaximumExceeded] = useState<boolean>(false);

  function submitDeviceName(
    e: React.KeyboardEvent<HTMLInputElement> &
      React.ChangeEvent<HTMLInputElement>
  ) {
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

  const [shareWifi, setShareWifi] = useState<boolean>(false);
  const [usersTab, setUsersTab] = useState<string>("");
  const [wallpaperInput, setWallpaperInput] = useState<string | null>(null);

  function addImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setWallpaperInput(URL.createObjectURL(e.target.files[0]));
      dispatch(changeWallpaper(URL.createObjectURL(e.target.files[0])));
    }
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

  const themeLight = useAppSelector((state) => state.appearance.themeLight);
  const blocks = useAppSelector((state) => state.msgbox.blocks);

  useEffect(() => {
    if (maximumExceeded) {
      dispatch(
        setBlocks([
          ...blocks,
          {
            topBarTitle: "Error!",
            content: "Maximum characters exceeded.",
            buttons: [
              {
                label: "OK",
              },
            ],
          },
        ])
      );
    }
  }, [maximumExceeded]);

  function switchTab() {
    switch (settings) {
      case "Wi-Fi":
        return (
          <>
            <div style={{ height: !settingsReducer.wifi ? "100%" : "" }}>
              <div className="SettingsSectionBlock WiFi">
                <div className="SettingsSectionFixedWidth">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "40px",
                    }}
                  >
                    <p className="font-bold" style={{ fontSize: "14px" }}>
                      Airplane Mode
                    </p>
                    <Toggle
                      active={settingsReducer.airplaneMode}
                      onToggle={() =>
                        dispatch(
                          toggleAirplaneMode(!settingsReducer.airplaneMode)
                        )
                      }
                    />
                  </div>
                  {settingsReducer.wifi ? (
                    <>
                      <p
                        className="font-bold"
                        style={{ marginBottom: "30px", fontSize: "14px" }}
                      >
                        Visible Networks
                      </p>
                      <div className="VisibleNetworks">
                        {wifis.map((i) => (
                          <>
                            {i.connected ? (
                              <Hammer
                                onPress={() => setShareWifi(true)}
                                options={{
                                  recognizers: {
                                    press: {
                                      time: 350,
                                    },
                                  },
                                }}
                              >
                                <div className="ItemSelection">
                                  <p>{i.name}</p>
                                  <div className="ItemSelectionIcon">
                                    {i.connected ? (
                                      <i className="fa-solid fa-check" />
                                    ) : (
                                      ""
                                    )}
                                    {i.private ? (
                                      <i className="fa-solid fa-lock" />
                                    ) : (
                                      ""
                                    )}
                                    {i.status === "good" ? (
                                      <i className="fa-solid fa-wifi" />
                                    ) : i.status === "fair" ? (
                                      <i className="fa-duotone fa-wifi-fair" />
                                    ) : i.status === "weak" ? (
                                      <i className="fa-duotone fa-wifi-weak" />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </Hammer>
                            ) : (
                              <>
                                <div
                                  className="ItemSelection"
                                  onClick={() =>
                                    dispatch(insertPasswordFor(i.name))
                                  }
                                >
                                  <p>{i.name}</p>
                                  <div className="ItemSelectionIcon">
                                    {i.connected ? (
                                      <i className="fa-solid fa-check" />
                                    ) : (
                                      ""
                                    )}
                                    {i.private ? (
                                      <i className="fa-solid fa-lock" />
                                    ) : (
                                      ""
                                    )}
                                    {i.status === "good" ? (
                                      <i className="fa-solid fa-wifi" />
                                    ) : i.status === "fair" ? (
                                      <i className="fa-duotone fa-wifi-fair" />
                                    ) : i.status === "weak" ? (
                                      <i className="fa-duotone fa-wifi-weak" />
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
                          className="ItemSelection"
                          onClick={() => dispatch(toggleActive(true))}
                        >
                          <p>Other...</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="StatusWifiFalse">
                      <i className="fa-solid fa-wifi-slash" />
                      <p className="Title font-bold">Wi-Fi Has Turned Off</p>
                      <p className="Description">
                        To get access to Internet connection, please turn on the
                        Wi-Fi.
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
            <div className="SettingsSectionBlock Bluetooth">
              <div className="SettingsSectionFixedWidth">
                {settingsReducer.bluetooth ? (
                  <div className="BluetoothDevices">
                    <p className="Description">
                      Now discoverable as "{settingsReducer.deviceName}".
                    </p>
                    <div style={{ marginTop: "30px" }}>
                      <p
                        className="font-bold"
                        style={{ marginBottom: "30px", fontSize: "14px" }}
                      >
                        Other Devices
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="StatusBluetoothFalse">
                    <i className="fa-solid fa-bluetooth" />
                    <p className="Title font-bold">Bluetooth Has Turned Off</p>
                    <p className="Description">
                      To get access to Bluetooth devices, please turn on the
                      Bluetooth.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        );
      case "Appearance":
        return (
          <>
            <div
              className="SettingsSectionBlock Appearance"
              style={{ height: "fit-content", marginBottom: "30px" }}
            >
              <div className="SettingsSectionFixedWidth">
                <div className="WindowColors">
                  <p
                    className="font-bold"
                    style={{ marginBottom: "30px", fontSize: "14px" }}
                  >
                    Window colors
                  </p>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      className={`ImageContainer ${!themeLight && "active"}`}
                      style={{ marginRight: "20px" }}
                      onClick={() => dispatch(toggleLightMode(false))}
                    >
                      <img src={Image1} />
                    </div>
                    <div
                      className={`ImageContainer ${themeLight && "active"}`}
                      onClick={() => dispatch(toggleLightMode(true))}
                    >
                      <img src={Image2} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="SettingsSectionBlock Appearance"
              style={{ height: "fit-content", marginBottom: "30px" }}
            >
              <div className="Wallpapers">
                <p
                  className="font-bold"
                  style={{ marginBottom: "30px", fontSize: "14px" }}
                >
                  Wallpapers
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
                    style={{
                      position: "relative",
                      width: "100%",
                      marginBottom: "5px",
                    }}
                  >
                    {wallpaperInput ? (
                      <div className="WallpaperBg">
                        <button
                          className="CloseButton"
                          onClick={() => setWallpaperInput(null)}
                        >
                          <i className="fa-regular fa-xmark" />
                        </button>
                        <div
                          className="WallpaperImageWrapper"
                          onClick={() =>
                            dispatch(changeWallpaper(wallpaperInput))
                          }
                        >
                          <div
                            className="WallpaperImage"
                            style={{
                              backgroundImage: `url(${wallpaperInput})`,
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="AddWallpaper">
                          <i
                            className="fa-regular fa-plus"
                            style={{ fontSize: "35px", marginBottom: "20px" }}
                          />
                          <p className="font-bold" style={{ fontSize: "14px" }}>
                            Add wallpaper
                          </p>
                        </div>
                        <input
                          className="AddWallpaperInput"
                          type="file"
                          accept=".png,.jpg,.gif,.jpeg,.heic,.heif"
                          onChange={addImage}
                        />
                      </>
                    )}
                  </div>
                  <div
                    className={`WImageContainer ${
                      wallpaper === W1 && "active"
                    }`}
                    onClick={() => dispatch(changeWallpaper(W1))}
                  >
                    <img src={W1} />
                  </div>
                  <div
                    className={`WImageContainer ${
                      wallpaper === W2 && "active"
                    }`}
                    onClick={() => dispatch(changeWallpaper(W2))}
                  >
                    <img src={W2} />
                  </div>
                  <div
                    className={`WImageContainer ${
                      wallpaper === W3 && "active"
                    }`}
                    onClick={() => dispatch(changeWallpaper(W3))}
                  >
                    <img src={W3} />
                  </div>
                  <div
                    className={`WImageContainer ${
                      wallpaper === W4 && "active"
                    }`}
                    onClick={() => dispatch(changeWallpaper(W4))}
                  >
                    <img src={W4} />
                  </div>
                  <div
                    className={`WImageContainer ${
                      wallpaper === W5 && "active"
                    }`}
                    onClick={() => dispatch(changeWallpaper(W5))}
                  >
                    <img src={W5} />
                  </div>
                  <div
                    className={`WImageContainer ${
                      wallpaper === W6 && "active"
                    }`}
                    onClick={() => dispatch(changeWallpaper(W6))}
                  >
                    <img src={W6} />
                  </div>
                  <div
                    className={`WImageContainer ${
                      wallpaper === W7 && "active"
                    }`}
                    onClick={() => dispatch(changeWallpaper(W7))}
                  >
                    <img src={W7} />
                  </div>
                  <div
                    className={`WImageContainer ${
                      wallpaper === W8 && "active"
                    }`}
                    onClick={() => dispatch(changeWallpaper(W8))}
                  >
                    <img src={W8} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="SettingsSectionBlock Appearance"
              style={{ height: "fit-content", marginBottom: "30px" }}
            >
              <div className="HeaderAppearance">
                <p
                  className="font-bold"
                  style={{ marginBottom: "30px", fontSize: "14px" }}
                >
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
                    <Toggle
                      active={header.proMode}
                      disabled={shellTheme === "WhiteSur"}
                      onToggle={() => dispatch(setProMode(!header.proMode))}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="SettingsSectionBlock Appearance"
              style={{ height: "fit-content", marginBottom: "30px" }}
            >
              <div className="Themes">
                <p
                  className="font-bold"
                  style={{ marginBottom: "30px", fontSize: "14px" }}
                >
                  Appearances
                </p>
                <div style={{ width: "649.516px" }}>
                  <div className="ThemesMenu">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i
                        className="fa-regular fa-arrow-pointer"
                        style={{ marginRight: "7px" }}
                      />
                      <p>Cursor</p>
                    </div>
                    <div
                      className="MenuSection"
                      onClick={() => showCursorMenu(true)}
                    >
                      <p style={{ marginRight: "7px" }}>Default</p>
                      <i className="fa-regular fa-chevron-down" />
                    </div>
                    <ActMenu
                      style={{
                        zIndex: "1",
                        width: "200px",
                        transform: "translate(450px, 0px)",
                      }}
                      className={cursorMenu ? "active" : ""}
                      ref={cursorMenuRef}
                    >
                      <ActMenuSelector
                        onClose={() => showCursorMenu(false)}
                        title="Default"
                        active
                      />
                    </ActMenu>
                  </div>
                  <div className="ThemesMenu">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i
                        className="fa-regular fa-icons"
                        style={{ marginRight: "7px" }}
                      />
                      <p>Icons</p>
                    </div>
                    <div
                      className="MenuSection"
                      onClick={() => showIconsMenu(true)}
                    >
                      <p style={{ marginRight: "7px" }}>Default</p>
                      <i className="fa-regular fa-chevron-down" />
                    </div>
                    <ActMenu
                      style={{
                        zIndex: "1",
                        width: "200px",
                        transform: "translate(450px, 0px)",
                      }}
                      className={iconsMenu ? "active" : ""}
                      ref={iconsMenuRef}
                    >
                      <ActMenuSelector
                        onClose={() => showIconsMenu(false)}
                        title="Default"
                        active
                      />
                    </ActMenu>
                  </div>
                  <div className="ThemesMenu">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i
                        className="fa-solid fa-font-case"
                        style={{ marginRight: "7px" }}
                      />
                      <p>Fonts</p>
                    </div>
                    <div
                      className="MenuSection"
                      onClick={() => showFontsMenu(true)}
                    >
                      <p style={{ marginRight: "7px" }}>
                        {settingsReducer.fontFamily}
                      </p>
                      <i className="fa-regular fa-chevron-down" />
                    </div>
                    <ActMenu
                      style={{
                        zIndex: "1",
                        width: "200px",
                        transform: "translate(450px, 0px)",
                      }}
                      className={fontsMenu ? "active" : ""}
                      ref={fontsMenuRef}
                    >
                      <ActMenuSelector
                        onClose={() => showFontsMenu(false)}
                        title="OptimisticDisplay"
                        active={
                          settingsReducer.fontFamily === "OptimisticDisplay"
                        }
                        onClick={() =>
                          dispatch(setFontFamily("OptimisticDisplay"))
                        }
                      />
                      <ActMenuSelector
                        onClose={() => showFontsMenu(false)}
                        title="SanFrancisco"
                        active={settingsReducer.fontFamily === "SanFrancisco"}
                        onClick={() => dispatch(setFontFamily("SanFrancisco"))}
                      />
                    </ActMenu>
                  </div>
                  <div className="ThemesMenu">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i
                        className="fa-solid fa-browser"
                        style={{ marginRight: "7px" }}
                      />
                      <p>Shell</p>
                    </div>
                    <div
                      className="MenuSection"
                      onClick={() => showShellMenu(true)}
                    >
                      <p style={{ marginRight: "7px" }}>{shellTheme}</p>
                      <i className="fa-regular fa-chevron-down" />
                    </div>
                    <ActMenu
                      style={{
                        zIndex: "1",
                        width: "200px",
                        transform: "translate(450px, 0px)",
                      }}
                      className={shellMenu ? "active" : ""}
                      ref={shellMenuRef}
                    >
                      <ActMenuSelector
                        onClose={() => showShellMenu(false)}
                        title="Breeze"
                        active={shellTheme === "Breeze"}
                        onClick={() => dispatch(changeShell("Breeze"))}
                      />
                      <ActMenuSelector
                        onClose={() => showShellMenu(false)}
                        title="WhiteSur (beta)"
                        active={shellTheme === "WhiteSur"}
                        onClick={() => dispatch(changeShell("WhiteSur"))}
                      />
                    </ActMenu>
                  </div>
                  <div className="ThemesMenu">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i
                        className="fa-regular fa-volume"
                        style={{ marginRight: "7px" }}
                      />
                      <p>Sound</p>
                    </div>
                    <div
                      className="MenuSection"
                      onClick={() => showSoundMenu(true)}
                    >
                      <p style={{ marginRight: "7px" }}>Oxygen</p>
                      <i className="fa-regular fa-chevron-down" />
                    </div>
                    <ActMenu
                      style={{
                        zIndex: "1",
                        width: "200px",
                        transform: "translate(450px, 0px)",
                      }}
                      className={soundMenu ? "active" : ""}
                      ref={soundMenuRef}
                    >
                      <ActMenuSelector
                        title="Oxygen"
                        onClose={() => showSoundMenu(false)}
                        active
                      />
                    </ActMenu>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case "Widgets":
        return (
          <>
            <div className="SettingsSectionBlock Widgets">
              <div className="CurrentWidgets">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "30px",
                  }}
                >
                  <p className="font-bold" style={{ fontSize: "14px" }}>
                    Current widgets
                  </p>
                  <i className="fa-regular fa-plus WidgetsButton" />
                </div>
                <div
                  className="SettingsSectionFixedWidth"
                  style={{ flexDirection: "row", height: "fit-content" }}
                >
                  <div className="WidgetsContainer">
                    {widget.widgets.map((i) => (
                      <WidgetType type={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case "Notifications":
        return (
          <>
            <div className="SettingsSectionBlock Notifications">
              <div className="SettingsSectionFixedWidth">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "40px",
                  }}
                >
                  <p className="font-bold" style={{ fontSize: "14px" }}>
                    Do Not Disturb
                  </p>
                  <Toggle
                    active={settingsReducer.notifications}
                    onToggle={toggleDoNotDisturb}
                  />
                </div>
              </div>
            </div>
          </>
        );
      case "Battery":
        return (
          <div className="SettingsSectionBlock Battery">
            <div className="SettingsSectionFixedWidth">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginBottom: "40px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                  }}
                >
                  <p className="font-bold" style={{ fontSize: "14px" }}>
                    Battery level
                  </p>
                  <p style={{ fontSize: "14px" }}>
                    {batteryIsCharging ? (
                      <>
                        {(batteryState.chargingTime / 3600).toFixed(0)}{" "}
                        {(batteryState.chargingTime / 3600).toFixed(0) === "1"
                          ? "hour"
                          : "hours"}{" "}
                        {(batteryState.chargingTime / 600).toFixed(0)}{" "}
                        {(batteryState.chargingTime / 600).toFixed(0) === "1"
                          ? "minute"
                          : "minutes"}
                      </>
                    ) : (
                      <>
                        {(batteryState.dischargingTime / 3600).toFixed(0)}{" "}
                        {(batteryState.dischargingTime / 3600).toFixed(0) ===
                        "1"
                          ? "hour"
                          : "hours"}{" "}
                        {(batteryState.dischargingTime / 600).toFixed(0)}{" "}
                        {(batteryState.dischargingTime / 600).toFixed(0) === "1"
                          ? "minute"
                          : "minutes"}
                      </>
                    )}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div className="BatteryLevelContainer">
                    <div
                      className={`BatteryLevel ${
                        batteryPercent < "10" && "lowbattery"
                      }`}
                      style={{ width: `${batteryPercent}%` }}
                    />
                  </div>
                  <p style={{ fontSize: "14px" }}>{batteryPercent}%</p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "40px",
                }}
              >
                <p className="font-bold" style={{ fontSize: "14px" }}>
                  Battery saver
                </p>
                <Toggle
                  active={settingsReducer.batterySaver}
                  onToggle={() =>
                    dispatch(setBatterySaver(!settingsReducer.batterySaver))
                  }
                />
              </div>
            </div>
          </div>
        );
      case "Displays":
        return (
          <>
            <div className="SettingsSectionBlock Displays">
              <div className="BuiltInDisplay">
                <p
                  className="font-bold"
                  style={{ marginBottom: "30px", fontSize: "14px" }}
                >
                  Built-in display
                </p>
                <div className="SettingsSectionFixedWidth">
                  <div className="BiDMenu">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i
                        className="fa-regular fa-image-landscape"
                        style={{ marginRight: "7px" }}
                      />
                      <p>Orientation</p>
                    </div>
                    <div
                      className="MenuSection"
                      onClick={() => showOrientationMenu(true)}
                    >
                      <p style={{ marginRight: "7px" }}>Landscape</p>
                      <i className="fa-regular fa-chevron-down" />
                    </div>
                    <ActMenu
                      style={{
                        zIndex: "1",
                        width: "200px",
                        transform: "translate(450px, 0px)",
                      }}
                      className={orientationMenu ? "active" : ""}
                      ref={orientationMenuRef}
                    >
                      <ActMenuSelector
                        onClose={() => showOrientationMenu(false)}
                        title="Landscape"
                        active
                      />
                      <ActMenuSelector
                        onClose={() => showOrientationMenu(false)}
                        title="Portrait"
                      />
                    </ActMenu>
                  </div>
                  <div className="BiDMenu">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i
                        className="fa-regular fa-expand-wide"
                        style={{ marginRight: "7px" }}
                      />
                      <p>Resolution</p>
                    </div>
                    <div
                      className="MenuSection"
                      onClick={() => showResolutionMenu(true)}
                    >
                      <p style={{ marginRight: "7px" }}>
                        {window.screen.width} &times; {window.screen.height}{" "}
                        &#40;16:9&#41;
                      </p>
                      <i className="fa-regular fa-chevron-down" />
                    </div>
                    <ActMenu
                      style={{
                        zIndex: "1",
                        width: "200px",
                        transform: "translate(450px, 0px)",
                      }}
                      className={resolutionMenu ? "active" : ""}
                      ref={resolutionMenuRef}
                    >
                      <ActMenuSelector
                        onClose={() => showResolutionMenu(false)}
                        title={`${window.screen.width} \u00D7 ${window.screen.height} (16:9)`}
                        active
                      />
                    </ActMenu>
                  </div>
                  <div className="BiDMenu">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i
                        className="fa-regular fa-arrows-rotate"
                        style={{ marginRight: "7px" }}
                      />
                      <p>Refresh Rate</p>
                    </div>
                    <div
                      className="MenuSection"
                      onClick={() => showRefreshRateMenu(true)}
                    >
                      <p style={{ marginRight: "7px" }}>60.00 Hz</p>
                      <i className="fa-regular fa-chevron-down" />
                    </div>
                    <ActMenu
                      style={{
                        zIndex: "1",
                        width: "200px",
                        transform: "translate(450px, 0px)",
                      }}
                      className={refreshRateMenu ? "active" : ""}
                      ref={refreshRateMenuRef}
                    >
                      <ActMenuSelector
                        onClose={() => showRefreshRateMenu(false)}
                        title="60.00 Hz"
                        active
                      />
                      <ActMenuSelector
                        onClose={() => showRefreshRateMenu(false)}
                        title="50.00 Hz"
                      />
                      <ActMenuSelector
                        onClose={() => showRefreshRateMenu(false)}
                        title="40.00 Hz"
                      />
                      <ActMenuSelector
                        onClose={() => showRefreshRateMenu(false)}
                        title="30.00 Hz"
                      />
                    </ActMenu>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case "Region & Language":
        return (
          <>
            <div className="SettingsSectionBlock RegionNLanguage">
              <div className="SettingsSectionFixedWidth">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "40px",
                  }}
                >
                  <p className="font-bold" style={{ fontSize: "14px" }}>
                    Language
                  </p>
                  <div
                    className="MenuSection"
                    onClick={() => showLanguageMenu(true)}
                  >
                    <p style={{ marginRight: "7px" }}>{i18n.language}</p>
                    <i className="fa-regular fa-chevron-down" />
                  </div>
                  <ActMenu
                    style={{
                      zIndex: "1",
                      width: "200px",
                      transform: "translate(450px, 0px)",
                    }}
                    className={languageMenu ? "active" : ""}
                    ref={languageMenuRef}
                  >
                    <ActMenuSelector
                      onClose={() => showLanguageMenu(false)}
                      title="Deutsch"
                      onClick={() => i18n.changeLanguage("Deutsch")}
                      active={i18n.language === "Deutsch"}
                    />
                    <ActMenuSelector
                      onClose={() => showLanguageMenu(false)}
                      title="English (US)"
                      onClick={() => i18n.changeLanguage("English (US)")}
                      active={i18n.language === "English (US)"}
                    />
                    <ActMenuSelector
                      onClose={() => showLanguageMenu(false)}
                      title="Español"
                      onClick={() => i18n.changeLanguage("Español")}
                      active={i18n.language === "Español"}
                    />
                    <ActMenuSelector
                      onClose={() => showLanguageMenu(false)}
                      title="Français"
                      onClick={() => i18n.changeLanguage("Français")}
                      active={i18n.language === "Français"}
                    />
                    <ActMenuSelector
                      onClose={() => showLanguageMenu(false)}
                      title="Bahasa Indonesia"
                      onClick={() => i18n.changeLanguage("Bahasa Indonesia")}
                      active={i18n.language === "Bahasa Indonesia"}
                    />
                    <ActMenuSelector
                      onClose={() => showLanguageMenu(false)}
                      title="Italiano"
                      onClick={() => i18n.changeLanguage("Italiano")}
                      active={i18n.language === "Italiano"}
                    />
                    <ActMenuSelector
                      onClose={() => showLanguageMenu(false)}
                      title="日本語"
                      onClick={() => i18n.changeLanguage("日本語")}
                      active={i18n.language === "日本語"}
                    />
                    <ActMenuSelector
                      onClose={() => showLanguageMenu(false)}
                      title="한국어"
                      onClick={() => i18n.changeLanguage("한국어")}
                      active={i18n.language === "한국어"}
                    />
                    <ActMenuSelector
                      onClose={() => showLanguageMenu(false)}
                      title="Русский"
                      onClick={() => i18n.changeLanguage("Русский")}
                      active={i18n.language === "Русский"}
                    />
                    <ActMenuSelector
                      onClose={() => showLanguageMenu(false)}
                      title="แบบไทย"
                      onClick={() => i18n.changeLanguage("แบบไทย")}
                      active={i18n.language === "แบบไทย"}
                    />
                    <ActMenuSelector
                      onClose={() => showLanguageMenu(false)}
                      title="Український"
                      onClick={() => i18n.changeLanguage("Український")}
                      active={i18n.language === "Український"}
                    />
                    <ActMenuSelector
                      onClose={() => showLanguageMenu(false)}
                      title="Tiếng Việt"
                      onClick={() => i18n.changeLanguage("Tiếng Việt")}
                      active={i18n.language === "Tiếng Việt"}
                    />
                    <ActMenuSelector
                      onClose={() => showLanguageMenu(false)}
                      title="中文 (简体)"
                      onClick={() => i18n.changeLanguage("中文 (简体)")}
                      active={i18n.language === "中文 (简体)"}
                    />
                    <ActMenuSelector
                      onClose={() => showLanguageMenu(false)}
                      title="中文 (繁體)"
                      onClick={() => i18n.changeLanguage("中文 (繁體)")}
                      active={i18n.language === "中文 (繁體)"}
                    />
                  </ActMenu>
                </div>
              </div>
            </div>
          </>
        );
      case "Users":
        return (
          <div style={{ margin: "10px 0" }}>
            <div className="SettingsSectionBlock Users">
              <div className="SettingsSectionFixedWidth">
                <div className="UserCard">
                  <div className="UserInfo">
                    <Avatar size={1.7} />
                    <div style={{ marginLeft: "30px" }}>
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
                    <i className="fa-regular fa-gear UserIcon" />
                    <p>General</p>
                  </div>
                  <i className="fa-regular fa-chevron-right" />
                </div>
                <div
                  className="UserItem"
                  onClick={() => setUsersTab("security")}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <i className="fa-regular fa-lock UserIcon" />
                    <p>Security</p>
                  </div>
                  <i className="fa-regular fa-chevron-right" />
                </div>
              </div>
            </div>
          </div>
        );
      case "Accessibility":
        return (
          <div className="SettingsSectionBlock Accessibility">
            <div className="SettingsSectionFixedWidth">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "40px",
                }}
              >
                <p className="font-bold" style={{ fontSize: "14px" }}>
                  Reduce animations
                </p>
                <Toggle
                  active={settingsReducer.animationsReduced}
                  onToggle={() =>
                    dispatch(
                      setAnimationsReduced(!settingsReducer.animationsReduced)
                    )
                  }
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "40px",
                }}
              >
                <p className="font-bold" style={{ fontSize: "14px" }}>
                  Invert color
                </p>
                <Toggle
                  active={settingsReducer.colorInverted}
                  onToggle={() =>
                    dispatch(setColorInverted(!settingsReducer.colorInverted))
                  }
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "40px",
                }}
              >
                <p className="font-bold" style={{ fontSize: "14px" }}>
                  Reduce transparency
                </p>
                <Toggle
                  active={settingsReducer.transparencyReduced}
                  onToggle={() =>
                    dispatch(
                      setTransparencyReduced(
                        !settingsReducer.transparencyReduced
                      )
                    )
                  }
                />
              </div>
            </div>
          </div>
        );
      case "Date & Time":
        return (
          <div className="SettingsSectionBlock DateNTime">
            <div className="SettingsSectionFixedWidth">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "40px",
                }}
              >
                <p className="font-bold" style={{ fontSize: "14px" }}>
                  24-hour time
                </p>
                <Toggle
                  active={!isHour12}
                  onToggle={() => dispatch(toggle12Hour(!isHour12))}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "40px",
                }}
              >
                <p className="font-bold" style={{ fontSize: "14px" }}>
                  Display seconds
                </p>
                <Toggle
                  active={isSecondsEnabled}
                  onToggle={() => dispatch(setSeconds(!isSecondsEnabled))}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "40px",
                }}
              >
                <p className="font-bold" style={{ fontSize: "14px" }}>
                  Temperature
                </p>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "20px",
                    }}
                  >
                    <Checkbox
                      active={weather.temperature === "celsius"}
                      onToggle={() => dispatch(setTemperature("celsius"))}
                      size={0.9}
                    />
                    <p style={{ marginLeft: "8px" }}>Celsius</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "20px",
                    }}
                  >
                    <Checkbox
                      active={weather.temperature === "fahrenheit"}
                      onToggle={() => dispatch(setTemperature("fahrenheit"))}
                      size={0.9}
                    />
                    <p style={{ marginLeft: "8px" }}>Fahrenheit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "About":
        return (
          <div className="SettingsSectionBlock About">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {themeLight ? (
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
                  className="ItemSelection"
                  onClick={() => allowEditDeviceName(!editDeviceName)}
                >
                  <p>Device Name</p>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ marginRight: "15px", opacity: ".25" }}>
                      {settingsReducer.deviceName}
                    </p>
                    <i
                      className={`fa-regular fa-chevron-right ${
                        editDeviceName ? "rotated" : ""
                      }`}
                    />
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
                <div className="ItemSelection">
                  <p>Hostname</p>
                  <p style={{ opacity: ".25" }}>{system.hostname}</p>
                </div>
                <div className="ItemSelection">
                  <p>Platform</p>
                  <p
                    style={{
                      textTransform: "capitalize",
                      opacity: ".25",
                    }}
                  >
                    {system.platform}
                  </p>
                </div>
                {system.version && (
                  <div className="ItemSelection">
                    <p>Version</p>
                    <p style={{ opacity: ".25" }}>{system.version}</p>
                  </div>
                )}
                <div className="ItemSelection">
                  <p>Shell</p>
                  <p style={{ opacity: ".25" }}>{shellTheme}</p>
                </div>
                <div className="ItemSelection">
                  <p>Kernel</p>
                  <p style={{ opacity: ".25" }}>{system.kernel}</p>
                </div>
                <div className="ItemSelection">
                  <p>Memory</p>
                  <p style={{ opacity: ".25" }}>{system.memory.total} GB</p>
                </div>
                <div className="ItemSelection">
                  <p>Processor</p>
                  <p style={{ opacity: ".25" }}>{system.processor}</p>
                </div>
                <div className="ItemSelection">
                  <p>Graphics</p>
                  <p style={{ opacity: ".25" }}>{system.graphics}</p>
                </div>
                <div className="ItemSelection">
                  <p>Disk Capacity</p>
                  <p style={{ opacity: ".25" }}>{system.disks.total} GB</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <p>Nothing in this section.</p>;
    }
  }

  const [wrongPasswordAni, setWrongPasswordAni] = useState<boolean>(false);

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

  function cancel() {
    dispatch(setInactive());
    dispatch(cancelPassword());
  }

  const wp = useAppSelector((state) => state.wifipassword);

  const [userName, setUserName] = useState<string>("");

  function switchUsersTab() {
    switch (usersTab) {
      case "general":
        return (
          <>
            <Avatar size={2} editable />
            <div className="UserInfo">
              <input
                placeholder={settingsReducer.user.name}
                value={userName}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserName(e.target.value)
                }
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
    <div className="SettingsWindow">
      <Draggable handle="#TopBar">
        <div
          className={`Window settings ${isActive && "active"} ${
            isHide && "hide"
          } ${isMinimized && "minimize"}`}
        >
          <TopBar
            title={t(`apps.${id}.name`)}
            onDblClick={() =>
              isMinimized
                ? dispatch(maximizeApp(id))
                : dispatch(minimizeApp(id))
            }
          >
            <div className="TabBarWrapper" style={{ width: "100%" }}>
              <div
                className="TabBar"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div
                  className="TabBarItem"
                  style={{
                    width: isMinimized ? "120px" : "80px",
                    paddingLeft: 0,
                    paddingRight: 0,
                    flexDirection: "row-reverse",
                    transition: "all ease .3s",
                  }}
                >
                  <div className="TabBarInteraction">
                    <i className="fa-regular fa-magnifying-glass" />
                  </div>
                </div>
                <div
                  className="TabBarItem TabBarSettingsName"
                  style={
                    settings === "Wi-Fi" || settings === "Bluetooth"
                      ? { justifyContent: "space-between", padding: "2px 9px" }
                      : { justifyContent: "center" }
                  }
                >
                  {settings === "Wi-Fi" ? (
                    <>
                      <div
                        style={{
                          width: "94%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <p>{settings}</p>
                      </div>
                      <Toggle
                        active={settingsReducer.wifi}
                        onToggle={() =>
                          dispatch(toggleWifi(!settingsReducer.wifi))
                        }
                      />
                    </>
                  ) : settings === "Bluetooth" ? (
                    <>
                      <div
                        style={{
                          width: "94%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <p>{settings}</p>
                      </div>
                      <Toggle
                        active={settingsReducer.bluetooth}
                        onToggle={() =>
                          dispatch(toggleBluetooth(!settingsReducer.bluetooth))
                        }
                      />
                    </>
                  ) : (
                    <p>{settings}</p>
                  )}
                </div>
              </div>
            </div>
            <div
              className="TopBarInteractionWrapper"
              style={{ display: "flex" }}
            >
              <TopBarInteraction
                action="hide"
                onHide={() => dispatch(hideApp(id))}
              />
              <TopBarInteraction
                action={isMinimized ? "max" : "min"}
                onMinMax={() =>
                  isMinimized
                    ? dispatch(maximizeApp(id))
                    : dispatch(minimizeApp(id))
                }
              />
              <TopBarInteraction
                action="close"
                onClose={() => dispatch(quitApp(id))}
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
                      <i className="fa-solid fa-xmark fa-lg" />
                    </div>
                  </div>
                </div>
                <div className="WindowBodyDefault">
                  <div className="WindowBodyContent">
                    <p style={{ marginBottom: "30px" }} className="font-bold">
                      BreezeOS
                    </p>
                    {themeLight ? (
                      <img width="auto" height={300} src={QRL} />
                    ) : (
                      <img width="auto" height={300} src={QRD} />
                    )}
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
                      <i className="fa-regular fa-key" />
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
                          autoComplete="false"
                          spellCheck={false}
                          value={wp.value}
                          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                            dispatch(setInputPassword(e.target.value))
                          }
                          className={`InputPassword ${
                            wp.isWrong ? "wrongPassword" : ""
                          } ${wrongPasswordAni ? "activeAnimation" : ""}`}
                        />
                        <i
                          className={`fa-regular ${
                            wp.isShow ? "fa-eye-slash" : "fa-eye"
                          } displayPassword ${
                            wp.value === "" ? "disabled" : ""
                          }`}
                          onClick={() =>
                            wp.isShow
                              ? dispatch(displayPassword(false))
                              : dispatch(displayPassword(true))
                          }
                        />
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
                      <i className="fa-regular fa-wifi" />
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
                          autoComplete="false"
                          spellCheck={false}
                          value={nw.name}
                          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                            dispatch(setWifiName(e.target.value))
                          }
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
                          <i className="fa-regular fa-chevron-down" />
                          <ActMenu
                            style={{
                              zIndex: "1",
                              width: "382px",
                              top: "0",
                              right: "0",
                            }}
                            className={securityMenu ? "active" : ""}
                            ref={securityMenuRef}
                          >
                            <ActMenuSelector
                              onClose={() => showSecurityMenu(false)}
                              title="None"
                              active={nw.security === "None"}
                              onClick={() => dispatch(setSecurity("None"))}
                            />
                            <ActMenuSelector
                              onClose={() => showSecurityMenu(false)}
                              title="WEP"
                              active={nw.security === "WEP"}
                              onClick={() => dispatch(setSecurity("WEP"))}
                            />
                            <ActMenuSelector
                              onClose={() => showSecurityMenu(false)}
                              title="WPA"
                              active={nw.security === "WPA"}
                              onClick={() => dispatch(setSecurity("WPA"))}
                            />
                            <ActMenuSelector
                              onClose={() => showSecurityMenu(false)}
                              title="WPA2"
                              active={nw.security === "WPA2"}
                              onClick={() => dispatch(setSecurity("WPA2"))}
                            />
                            <ActMenuSelector
                              onClose={() => showSecurityMenu(false)}
                              title="WPA Enterprise"
                              active={nw.security === "WPA Enterprise"}
                              onClick={() =>
                                dispatch(setSecurity("WPA Enterprise"))
                              }
                            />
                            <ActMenuSelector
                              onClose={() => showSecurityMenu(false)}
                              title="WPA2 Enterprise"
                              active={nw.security === "WPA2 Enterprise"}
                              onClick={() =>
                                dispatch(setSecurity("WPA2 Enterprise"))
                              }
                            />
                            <ActMenuSelector
                              onClose={() => showSecurityMenu(false)}
                              title="WPA3 Enterprise"
                              active={nw.security === "WPA3 Enterprise"}
                              onClick={() =>
                                dispatch(setSecurity("WPA3 Enterprise"))
                              }
                            />
                          </ActMenu>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <input
                            type={wp.isShow ? "text" : "password"}
                            id="password"
                            placeholder="Password"
                            autoComplete="false"
                            spellCheck={false}
                            value={wp.value}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                              dispatch(setInputPassword(e.target.value))
                            }
                            className={`Input ${
                              wp.isWrong ? "wrongInfo" : ""
                            } ${wrongPasswordAni ? "activeAnimation" : ""}`}
                            style={{ margin: "0" }}
                          />
                          <i
                            className={`fa-regular ${
                              wp.isShow ? "fa-eye-slash" : "fa-eye"
                            } displayPassword ${
                              wp.value === "" ? "disabled" : ""
                            }`}
                            onClick={() =>
                              wp.isShow
                                ? dispatch(displayPassword(false))
                                : dispatch(displayPassword(true))
                            }
                          />
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
                      <i className="fa-solid fa-xmark fa-lg" />
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
                              className={`DropdownMenu ${
                                settings === i.name && "active"
                              }`}
                              onMouseDown={i.onClick}
                            >
                              <i className={i.icon} />
                              <p className="DropdownTitle">{i.name}</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  style={{ overflow: "auto", width: "100%", height: "100%" }}
                >
                  <div className="SettingsContainer">
                    <div className="SettingsContainerInside">{switchTab()}</div>
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
