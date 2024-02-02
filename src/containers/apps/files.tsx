import React, { useState, useEffect, useRef } from "react";
import { setDirectory, setIconSize } from "@/store/reducers/files";
import "@/components/utils/window/Window.scss";
import TopBar from "@/components/utils/window/TopBar";
import WindowBody from "@/components/utils/window/WindowBody";
import "./assets/files.scss";
import TopBarInteraction from "@/components/utils/window/TopBarInteraction";
import ActMenu, { ActMenuSelector } from "@/components/utils/menu/index";
import Image1 from "./assets/Screenshot from 2022-09-10 20-41-45.png";
import Image3 from "./assets/dark.png";
import Image4 from "./assets/light.png";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import FilesItem from "./assets/FilesItem";
import {
  closeApp,
  enterFullScreen,
  hideApp,
  maximizeApp,
  minimizeApp,
} from "@/store/reducers/apps";

export default function Files({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const appIsActive = useAppSelector((state) => state.apps.appIsActive);
  const fullscreen = useAppSelector((state) => state.apps.fullscreen);
  const isActive = appIsActive[id].status === "active";
  const isHide = appIsActive[id].status === "hide";
  const isMinimized = appIsActive[id].minimized;
  const isFullScreen = fullscreen === id;
  const { t } = useTranslation();
  const shellTheme = useAppSelector((state) => state.shell.theme);
  const iconSize = useAppSelector((state) => state.files.iconSize);
  const directory = useAppSelector((state) => state.files.directory);
  const [settingsMenu, showSettingsMenu] = useState<boolean>(false);
  const system = useAppSelector((state) => state.system);
  const items = [
    [
      {
        icon: "clock-rotate-left",
        title: "Recent",
        active: directory === "Recent",
        onClick: () => dispatch(setDirectory("Recent")),
      },
      {
        icon: "star",
        title: "Favorites",
        active: directory === "Favorites",
        onClick: () => dispatch(setDirectory("Favorites")),
      },
      {
        icon: "house",
        title: "Home",
        active: directory === "/home",
        onClick: () => dispatch(setDirectory("/home")),
      },
      {
        icon: "desktop",
        title: "Desktop",
        active: directory === "/home/Desktop",
        onClick: () => dispatch(setDirectory("/home/Desktop")),
      },
      {
        icon: "file",
        title: "Documents",
        active: directory === "/home/Documents",
        onClick: () => dispatch(setDirectory("/home/Documents")),
      },
      {
        icon: "download",
        title: "Downloads",
        active: directory === "/home/Downloads",
        onClick: () => dispatch(setDirectory("/home/Downloads")),
      },
      {
        icon: "music",
        title: "Music",
        active: directory === "/home/Music",
        onClick: () => dispatch(setDirectory("/home/Music")),
      },
      {
        icon: "image",
        title: "Pictures",
        active: directory === "/home/Pictures",
        onClick: () => dispatch(setDirectory("/home/Pictures")),
      },
      {
        icon: "film",
        title: "Videos",
        active: directory === "/home/Videos",
        onClick: () => dispatch(setDirectory("/home/Videos")),
      },
      {
        icon: "trash",
        title: "Trash",
        active: directory === "Trash",
        onClick: () => dispatch(setDirectory("Trash")),
      },
    ],
    [
      {
        icon: "plus",
        title: "Other Locations",
        active: directory === "Other Locations",
        onClick: () => dispatch(setDirectory("Other Locations")),
      },
    ],
  ];

  function useOutsideSettingsMenu(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showSettingsMenu(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const settingsMenuRef = useRef(null);
  useOutsideSettingsMenu(settingsMenuRef);

  function close() {
    dispatch(closeApp(id));
    setTimeout(() => setDirectory(`/home`), 300);
  }

  function switchTab() {
    switch (directory) {
      case "/":
        return (
          <div className="FilesSection2">
            <FilesItem name="bin" location="/bin" isDir />
            <FilesItem name="boot" location="/boot" isDir />
            <FilesItem name="build" location="/build" isDir />
            <FilesItem name="dev" location="/dev" isDir />
            <FilesItem name="etc" location="/etc" isDir />
            <FilesItem name="home" location="/home" isDir />
            <FilesItem name="lib" location="/lib" isDir />
            <FilesItem name="lib64" location="/lib64" isDir />
            <FilesItem name="mnt" location="/mnt" isDir />
            <FilesItem name="opt" location="/opt" isDir />
            <FilesItem name="proc" location="/proc" isDir />
            <FilesItem name="root" location="/root" isDir />
            <FilesItem name="run" location="/run" isDir />
            <FilesItem name="sbin" location="/sbin" isDir />
            <FilesItem name="srv" location="/srv" isDir />
            <FilesItem name="sys" location="/sys" isDir />
            <FilesItem name="tmp" location="/tmp" isDir />
            <FilesItem name="usr" location="/usr" isDir />
            <FilesItem name="var" location="/var" isDir />
          </div>
        );
      case `/home`:
        return (
          <div className="FilesSection2">
            <FilesItem name="Desktop" location="/home/Desktop" isDir />
            <FilesItem name="Documents" location="/home/Documents" isDir />
            <FilesItem name="Downloads" location="/home/Downloads" isDir />
            <FilesItem name="Music" location="/home/Music" isDir />
            <FilesItem name="Pictures" location="/home/Pictures" isDir />
            <FilesItem name="Public" location="/home/Public" isDir />
            <FilesItem name="Templates" location="/home/Templates" isDir />
            <FilesItem name="Videos" location="/home/Videos" isDir />
          </div>
        );
      case `/home/Documents`:
        return (
          <div className="FilesSection2">
            <FilesItem
              name="Untitled-1.txt"
              location="/home/Documents/Untitled-1.txt"
              isDir
            />
            <FilesItem
              name="hello.cpp"
              location="/home/Documents/hello.cpp"
              isDir
            />
          </div>
        );
      case `/home/Downloads`:
        return (
          <div className="FilesSection2">
            <FilesItem
              name="code-stable-x64-1675893708"
              location="/home/Downloads/code-stable-x64-1675893708"
              isDir
            />
            <FilesItem
              name="dotfiles-public"
              location="/home/Downloads/dotfiles-public"
              isDir
            />
            <FilesItem
              name="Palatino"
              location="/home/Downloads/Palatino"
              isDir
            />
            <FilesItem
              name="cat-cute.jpg"
              location="/home/Downloads/cat-cute.jpg"
              thumbnail="https://github.com/feross/TheAnnoyingSite.com/blob/master/static/cat-cute.jpg?raw=true"
            />
            <FilesItem
              name="cat-blue-eyes.jpg"
              location="/home/Downloads/cat-blue-eyes.jpg"
              thumbnail="https://github.com/feross/TheAnnoyingSite.com/blob/master/static/cat-blue-eyes.jpg?raw=true"
            />
            <FilesItem
              name="Simple Green.pptx"
              location="/home/Downloads/Simple Green.pptx"
            />
            <FilesItem
              name="double-click this.mp4"
              location="/home/Downloads/double-click this.mp4"
            />
          </div>
        );
      case `/home/Downloads/code-stable-x64-1675893708`:
        return (
          <div className="FilesSection2">
            <FilesItem
              name="VSCode-linux-x64"
              location="/home/Downloads/code-stable-x64-1675893708/VSCode-linux-x64"
              isDir
            />
          </div>
        );
      case `/home/Pictures`:
        return (
          <div className="FilesSection2">
            <FilesItem
              name="Screenshots"
              location="/home/Pictures/Screenshots"
              isDir
            />
            <FilesItem
              name="cat-ceiling.jpg"
              location="/home/Pictures/cat-ceiling.jpg"
              thumbnail="https://github.com/feross/TheAnnoyingSite.com/blob/master/static/cat-ceiling.jpg?raw=true"
            />
            <FilesItem
              name="dark.png"
              location="/home/Pictures/dark.png"
              thumbnail={Image3}
            />
            <FilesItem
              name="light.png"
              location="/home/Pictures/light.png"
              thumbnail={Image4}
            />
            <FilesItem
              name="picture.png"
              location="/home/Pictures/picture.png"
              thumbnail="https://github.com/baodaigov/BreezeOS/blob/master/public/gallery/screenshot.png?raw=true"
            />
            <FilesItem
              name="picture-2.png"
              location="/home/Pictures/picture-2.png"
              thumbnail="https://github.com/baodaigov/BreezeOS/blob/master/public/gallery/screenshot2.png?raw=true"
            />
            <FilesItem
              name="picture-3.png"
              location="/home/Pictures/picture-3.png"
              thumbnail="https://github.com/baodaigov/BreezeOS/blob/master/public/gallery/screenshot3.png?raw=true"
            />
            <FilesItem
              name="picture-4.png"
              location="/home/Pictures/picture-4.png"
              thumbnail="https://github.com/baodaigov/BreezeOS/blob/master/public/gallery/screenshot4.png?raw=true"
            />
            <FilesItem
              name="picture-5.png"
              location="/home/Pictures/picture-5.png"
              thumbnail="https://github.com/baodaigov/BreezeOS/blob/master/public/gallery/screenshot5.png?raw=true"
            />
          </div>
        );
      case `/home/Pictures/Screenshots`:
        return (
          <div className="FilesSection2">
            <FilesItem
              name="Screenshot from 2022-09-10 20-41-45.png"
              location="/home/Pictures/Screenshots/Screenshot from 2022-09-10 20-41-45.png"
              thumbnail={Image1}
            />
          </div>
        );
      case `/home/Trash`:
        return (
          <div className="FilesSection2">
            <FilesItem
              name="thanhhafmcvn"
              location="/home/Trash/thanhhafmcvn"
              isDir
            />
          </div>
        );
      case "Other Locations":
        return (
          <div className="OtherLocations">
            <div className="HeaderBar">
              <p className="font-bold">On this computer</p>
              <p className="font-bold">Partitions</p>
            </div>
            <div>
              <div
                className="OtherLocationsItem"
                onClick={() => dispatch(setDirectory("/"))}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    className="FilesIcon"
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/devices/drive-harddisk.svg"
                    }
                    width={30}
                    height={30}
                    style={{ marginRight: "18px" }}
                  />
                  <p>BreezeOS</p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ margin: "0 20px" }}>
                    {system.disks.used} GB / {system.disks.total} GB left
                  </p>
                  <p style={{ margin: "0 20px" }}>/</p>
                </div>
              </div>
              <div
                className="OtherLocationsItem"
                onClick={() => dispatch(setDirectory("500MB Partition"))}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    className="FilesIcon"
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/devices/drive-harddisk.svg"
                    }
                    width={30}
                    height={30}
                    style={{ marginRight: "18px" }}
                  />
                  <p>500MB Partition</p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ margin: "0 20px" }}>/dev/sda1</p>
                </div>
              </div>
            </div>
            <div className="HeaderBar">
              <p className="font-bold">Networks</p>
            </div>
            <div>
              <div className="OtherLocationsItem">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    className="FilesIcon"
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/network-workgroup.svg"
                    }
                    width={30}
                    height={30}
                    style={{ marginRight: "18px" }}
                  />
                  <p>Windows Network</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "500MB Partition":
        return (
          <div className="FilesSection2">
            <FilesItem name="EFI" location="500MB Partition/EFI" isDir />
          </div>
        );
      case "500MB Partition/EFI":
        return (
          <div className="FilesSection2">
            <FilesItem name="GRUB" location="500MB Partition/EFI/GRUB" isDir />
          </div>
        );
      case "500MB Partition/EFI/GRUB":
        return (
          <div className="FilesSection2">
            <FilesItem
              name="grubx64.efi"
              location="500MB Partition/EFI/GRUB/grubx64.efi"
              isDir
            />
          </div>
        );
      default:
        return (
          <div className="NoFiles">
            <p>Empty Folder</p>
          </div>
        );
    }
  }

  return (
    <div className="FilesWindow">
      <Draggable handle="#TopBar">
        <div
          className={`Window files ${isActive && "active"} ${
            isHide && "hide"
          } ${isMinimized && "minimize"} ${isFullScreen && "fullscreen"}`}
        >
          <ActMenu
            style={{ zIndex: "1", top: "30px", right: "100px" }}
            className={settingsMenu ? "active" : ""}
            ref={settingsMenuRef}
          >
            <div className="iconSize">
              <ActMenuSelector title="Icon size">
                <div style={{ marginLeft: "15px", display: "flex" }}>
                  <i
                    className={`fa-regular fa-plus ActMenuInteraction ${
                      iconSize === 145 ? "disabled" : ""
                    }`}
                    onClick={() => dispatch(setIconSize(iconSize + 25))}
                  />
                  <i
                    className={`fa-regular fa-minus ActMenuInteraction ${
                      iconSize === 20 ? "disabled" : ""
                    }`}
                    onClick={() => dispatch(setIconSize(iconSize - 25))}
                  />
                </div>
              </ActMenuSelector>
            </div>
          </ActMenu>
          <TopBar
            title={t(`apps.${id}.name`)}
            onDblClick={() =>
              isMinimized
                ? dispatch(maximizeApp(id))
                : dispatch(minimizeApp(id))
            }
          >
          <div
            className="TabBarWrapper"
            style={{ width: "100%", pointerEvents: "none" }}
          >
            <div
              className="TabBar"
              style={{
                display: "flex",
                justifyContent: "space-between",
                pointerEvents: "none",
              }}
            >
                <div className="TabBarItem" style={{ paddingLeft: 0 }}>
                  <div className="TabBarInteraction">
                    <i className="fa-regular fa-chevron-left" />
                    <i className="fa-regular fa-chevron-right" />
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div className="TabBarItem TabBarFileSystem">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <i
                        className={`fa-regular ${
                          directory === "Recent"
                            ? "fa-clock-rotate-left"
                            : directory === "Favorites"
                            ? "fa-star"
                            : directory === "/home"
                            ? "fa-house"
                            : directory === "Trash"
                            ? "fa-trash"
                            : directory === "500MB Partition"
                            ? "fa-hard-drive"
                            : directory === "Other Locations"
                            ? "fa-plus"
                            : "fa-folder"
                        }`}
                        style={{ marginRight: "5px" }}
                      />
                      <p>{directory}</p>
                    </div>
                    <div className="TabBarInteraction">
                      <i className="fa-regular fa-ellipsis-vertical" />
                    </div>
                  </div>
                  <div className="TabBarItem">
                    <div className="TabBarInteraction">
                      <i className="fa-regular fa-magnifying-glass" />
                    </div>
                  </div>
                </div>
                <div className="TabBarItem" style={{ margin: "0" }}>
                  <div
                    className="TabBarInteraction"
                    style={{ marginRight: "20px" }}
                  >
                    <i className="fa-regular fa-grid-2" />
                    <div className="TabSeparator"></div>
                    <i
                      className="fa-regular fa-chevron-down"
                      style={{ marginLeft: "3px" }}
                    />
                  </div>
                  <div
                    className="TabBarInteraction"
                    onClick={() => showSettingsMenu(!settingsMenu)}
                  >
                    <i className="fa-regular fa-bars" />
                  </div>
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
                onPress={() => dispatch(enterFullScreen(id))}
              />
              <TopBarInteraction action="close" onClose={close} />
            </div>
          </TopBar>
          <WindowBody>
            <div
              className={`Files ${shellTheme === "WhiteSur" ? "whitesur" : ""}`}
            >
              {isFullScreen && (
                <div className="TopBar">
                  <div className="TopBarInteractionContainer">
                    <div className="TabBarWrapper" style={{ width: "100%" }}>
                      <div
                        className="TabBar"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="TabBarItem" style={{ paddingLeft: 0 }}>
                          <div className="TabBarInteraction">
                            <i className="fa-regular fa-chevron-left" />
                            <i className="fa-regular fa-chevron-right" />
                          </div>
                        </div>
                        <div style={{ display: "flex" }}>
                          <div className="TabBarItem TabBarFileSystem">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <i
                                className={`fa-regular ${
                                  directory === "Recent"
                                    ? "fa-clock-rotate-left"
                                    : directory === "Favorites"
                                    ? "fa-star"
                                    : directory === "/home"
                                    ? "fa-house"
                                    : directory === "Trash"
                                    ? "fa-trash"
                                    : directory === "500MB Partition"
                                    ? "fa-hard-drive"
                                    : directory === "Other Locations"
                                    ? "fa-plus"
                                    : "fa-folder"
                                }`}
                                style={{ marginRight: "5px" }}
                              />
                              <p>{directory}</p>
                            </div>
                            <div className="TabBarInteraction">
                              <i className="fa-regular fa-ellipsis-vertical" />
                            </div>
                          </div>
                          <div className="TabBarItem">
                            <div className="TabBarInteraction">
                              <i className="fa-regular fa-magnifying-glass" />
                            </div>
                          </div>
                        </div>
                        <div className="TabBarItem" style={{ margin: "0" }}>
                          <div
                            className="TabBarInteraction"
                            style={{ marginRight: "20px" }}
                          >
                            <i className="fa-regular fa-grid-2" />
                            <div className="TabSeparator"></div>
                            <i
                              className="fa-regular fa-chevron-down"
                              style={{ marginLeft: "3px" }}
                            />
                          </div>
                          <div
                            className="TabBarInteraction"
                            onClick={() => showSettingsMenu(!settingsMenu)}
                          >
                            <i className="fa-regular fa-bars" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="FilesSection">
                <div className="NavPanel">
                  {items.map((e) => (
                    <div>
                      {e.map((i) => (
                        <div
                          className={`DropdownMenu ${i.active && "active"}`}
                          onMouseDown={i.onClick}
                        >
                          <i className={`fa-regular fa-${i.icon}`} />
                          <p className="DropdownTitle">{i.title}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="FilesContainer">
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
                        height: "100%",
                        overflowY: "auto",
                      }}
                    >
                      {switchTab()}
                    </div>
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
