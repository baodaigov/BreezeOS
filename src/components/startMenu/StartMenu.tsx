import { useEffect, useState } from "react";
import "./StartMenu.scss";
import StartApp from "./StartApp";
import { setHeaderHide } from "../../store/reducers/header";
import { setDesktopBodyActive } from "../../store/reducers/desktopbody";
import { setStartMenuActive } from "../../store/reducers/startmenu";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useTranslation } from "react-i18next";
import { openApp } from "@/store/reducers/apps";

export default function StartMenu() {
  const isActive = useAppSelector((state) => state.startmenu.active);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  function hideStartMenuThruShortcut() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        dispatch(setStartMenuActive(false));
        dispatch(setHeaderHide(false));
        dispatch(setDesktopBodyActive(true));
      }
    });
  }

  useEffect(() => {
    hideStartMenuThruShortcut();
  }, []);

  const [searchValue, setSearchValue] = useState<string>("");

  const apps = useAppSelector((state) => state.apps.apps);

  function search() {
    let val = searchValue.toLowerCase();
    let matches = apps.filter((v) => {
      const label = t(`apps.${v.id}.name`);
      label.toLowerCase().includes(val);
    });
    console.log(matches);
  }

  return (
    <div className={`StartMenuWrapper ${isActive && "active"}`}>
      <div className="StartMenu">
        <div className="SearchMenu">
          <input
            value={searchValue}
            placeholder="Search..."
            className="SearchInput"
            onKeyDown={search}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.target.value)
            }
            spellCheck="false"
            autoCorrect="false"
          />
        </div>
        <div className="StartApps">
          {apps.map((i) => (
            <StartApp
              name={t(`apps.${i.id}.name`)}
              icon={i.icon}
              onClick={() => {
                !i.externalLink
                  ? dispatch(openApp(i.id))
                  : window.open(i.externalLink, "_blank");
                dispatch(setStartMenuActive(false));
                dispatch(setHeaderHide(false));
                dispatch(setDesktopBodyActive(true));
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
