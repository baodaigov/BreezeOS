import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./StartMenu.scss";
import StartApp from "./StartApp";
import { TerminalStartApp } from "../../containers/apps/terminal";
import { SurfaceStartApp } from "../../containers/apps/surface";
import { ClockStartApp } from "../../containers/apps/clock";
import { SettingsStartApp } from "../../containers/apps/settings";
import { CameraStartApp } from "../../containers/apps/camera";
import { FilesStartApp } from "../../containers/apps/files";
import { CalculatorStartApp } from "../../containers/apps/calculator";
import { TextEditorStartApp } from "../../containers/apps/texteditor";
import { SoftwareStoreStartApp } from "../../containers/apps/softwarestore";
import { CalendarStartApp } from "../../containers/apps/calendar";
import { VSCodeStartApp } from "../../containers/apps/vscode";
import { setHeaderHide } from "../../reducers/header";

export default function StartMenu() {
  const icon = useSelector((state) => state.appearance.iconTheme);
  const dispatch = useDispatch();

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
      document
        .getElementsByClassName("StartMenuWrapper")[0]
        .classList.remove("active");
      dispatch(setHeaderHide(false));
      document.getElementsByClassName("DesktopBody")[0].classList.add("active");
    }
  });

  const items = [
    {
      name: "Thunderbird",
      icon: `${
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/thunderbird.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/internet-mail.svg"
      }`,
      id: "thunderbird",
    },
    {
      name: "GitHub Desktop",
      icon: `${
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/github-desktop.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/github-desktop.svg"
      }`,
      id: "githubdesktop",
    },
    {
      name: "Vim",
      icon: `${
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/vim.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/vim.svg"
      }`,
      id: "vim",
    },
  ];

  const [searchValue, setSearchValue] = useState("");

  function search(e) {
    let val = searchValue.toLowerCase();
    let matches = items.filter((v) => v.name.toLowerCase().includes(val));
    console.log(matches);
  }

  return (
    <div className="StartMenuWrapper">
      <div className="StartMenu">
        <div className="SearchMenu">
          <input
            value={searchValue}
            placeholder="Search..."
            className="SearchInput"
            onKeyDown={search}
            onInput={(e) => setSearchValue(e.target.value)}
            spellCheck="false"
            autoCorrect="false"
          />
        </div>
        <div className="StartApps">
          <SurfaceStartApp />
          <CalendarStartApp />
          <SettingsStartApp />
          <ClockStartApp />
          <CameraStartApp />
          <FilesStartApp />
          <CalculatorStartApp />
          <TextEditorStartApp />
          <TerminalStartApp />
          <SoftwareStoreStartApp />
          <VSCodeStartApp />
          {items.map((i) => (
            <StartApp key={i.id} icon={i.icon} name={i.name} />
          ))}
        </div>
      </div>
    </div>
  );
}
