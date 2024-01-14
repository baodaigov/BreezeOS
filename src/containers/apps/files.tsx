import React, { useState, useEffect, useRef } from "react";
import {
  setActive,
  setDirectory,
  setHide,
  setIconSize,
} from "@/store/reducers/apps/files";
import "@/components/utils/window/Window.scss";
import TopBar from "@/components/utils/window/TopBar";
import WindowBody from "@/components/utils/window/WindowBody";
import DockItem from "@/components/dock/DockItem";
import "./assets/files.scss";
import TopBarInteraction from "@/components/utils/window/TopBarInteraction";
import StartApp from "@/components/startMenu/StartApp";
import ActMenu, { ActMenuSelector } from "@/components/utils/menu/index";
import Image1 from "./assets/Screenshot from 2022-09-10 20-41-45.png";
import Image3 from "./assets/dark.png";
import Image4 from "./assets/light.png";
import { setHeaderHide } from "@/store/reducers/header";
import { useTranslation } from "react-i18next";
import { setDesktopBodyActive } from "@/store/reducers/desktopbody";
import { setStartMenuActive } from "@/store/reducers/startmenu";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import FilesItem from "./assets/FilesItem";

export const FilesApp = () => {
  const { t } = useTranslation();
  const isActive = useAppSelector((state) => state.appsFiles.active);
  const isHide = useAppSelector((state) => state.appsFiles.hide);
  const dispatch = useAppDispatch();
  const icon = useAppSelector((state) => state.appearance.iconTheme);

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.keyCode === 54) {
      dispatch(setActive(true));
    }
  });

  return (
    <DockItem
      id="files"
      className={`FilesApp ${isActive && "clicked"} ${isHide && "hide"}`}
      title={t("apps.files.name")}
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/file-manager.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg"
      }
      menu={[
        [
          {
            label: "Recent",
            action: () => setDirectory("Recent"),
          },
          {
            label: "Favorites",
            action: () => setDirectory("Favorites"),
          },
          {
            label: "Home",
            action: () => setDirectory("/home"),
          },
          {
            label: "Desktop",
            action: () => setDirectory("/home/Desktop"),
          },
          {
            label: "Documents",
            action: () => setDirectory("/home/Documents"),
          },
          {
            label: "Downloads",
            action: () => setDirectory("/home/Downloads"),
          },
          {
            label: "Music",
            action: () => setDirectory("/home/Music"),
          },
          {
            label: "Pictures",
            action: () => setDirectory("/home/Pictures"),
          },
          {
            label: "Videos",
            action: () => setDirectory("/home/Videos"),
          },
          {
            label: "Trash",
            action: () => setDirectory("/.Bin"),
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

export const FilesStartApp = () => {
  const { t } = useTranslation();
  const isHide = useAppSelector((state) => state.appsFiles.hide);
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
      key="files"
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/file-manager.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg"
      }
      name={t("apps.files.name")}
      onClick={toggle}
    />
  );
};

export default function Files() {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((state) => state.appsFiles.active);
  const isHide = useAppSelector((state) => state.appsFiles.hide);
  const { t } = useTranslation();
  const shellTheme = useAppSelector((state) => state.shell.theme);
  const iconSize = useAppSelector((state) => state.appsFiles.iconSize);
  const directory = useAppSelector((state) => state.appsFiles.directory);
  const [settingsMenu, showSettingsMenu] = useState<boolean>(false);
  const icon = useAppSelector((state) => state.appearance.iconTheme);
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
        active: directory === "/.Bin",
        onClick: () => dispatch(setDirectory("/.Bin")),
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

  const [min, isMin] = useState(false);

  function close() {
    dispatch(setActive(false));
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
            {/* <div
              className="FilesItem"
              onDoubleClick={() =>
                (window.location.href = "https://youtu.be/y5jrmCE2-bg")
              }
            >
              <img
                className="FilesIcon"
                src={
                  icon === "WhiteSur-icon-theme"
                    ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/video-x-generic.svg"
                    : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/video-x-generic.svg"
                }
                width={iconSize}
                height={iconSize}
              />
              <p className="FilesName">double-click this.mp4</p>
            </div> */}
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
                      icon === "WhiteSur-icon-theme"
                        ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/devices/scalable/drive-harddisk.svg"
                        : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/devices/drive-harddisk.svg"
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
                      icon === "WhiteSur-icon-theme"
                        ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/devices/scalable/drive-harddisk.svg"
                        : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/devices/drive-harddisk.svg"
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
                      icon === "WhiteSur-icon-theme"
                        ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/devices/scalable/network_fs.svg"
                        : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/network-workgroup.svg"
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
      <Draggable handle=".TopBar">
        <div
          className={`Window files ${isActive && "active"} ${
            isHide && "hide"
          } ${min && "minimize"}`}
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
                    onClick={() => setIconSize(iconSize + 25)}
                  />
                  <i
                    className={`fa-regular fa-minus ActMenuInteraction ${
                      iconSize === 20 ? "disabled" : ""
                    }`}
                    onClick={() => setIconSize(iconSize - 25)}
                  />
                </div>
              </ActMenuSelector>
            </div>
          </ActMenu>
          <TopBar title={t("apps.files.name")} onDblClick={() => isMin(!min)}>
            <div className="TabBarWrapper" style={{ width: "100%" }}>
              <div
                className="TabBar"
                style={{ display: "flex", justifyContent: "space-between" }}
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
                          directory === 'Recent'
                            ? 'fa-clock-rotate-left'
                            : directory === 'Favorites'
                            ? 'fa-star'
                            : directory === '/home'
                            ? 'fa-house'
                            : directory === 'Trash'
                            ? 'fa-trash'
                            : directory === '500MB Partition'
                            ? 'fa-hard-drive'
                            : directory === 'Other Locations'
                            ? 'fa-plus'
                            : 'fa-folder'
                        }`}
                        style={{ marginRight: '5px' }}
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
                onHide={() => dispatch(setHide(true))}
              />
              <TopBarInteraction
                action={min ? "max" : "min"}
                onMinMax={() => isMin(!min)}
              />
              <TopBarInteraction action="close" onClose={close} />
            </div>
          </TopBar>
          <WindowBody>
            <div
              className={`Files ${shellTheme === "WhiteSur" ? "whitesur" : ""}`}
            >
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
