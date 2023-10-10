import { useState } from "react";
import { setActive, setHide } from "../../store/reducers/apps/calendar";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBody from "../../components/utils/window/WindowBody";
import DockItem from "../../components/DockItem";
import "./assets/calendar.scss";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import StartApp from "../../components/startMenu/StartApp";
import dayjs from "dayjs";
import range from "lodash-es/range";
import { setHeaderHide } from "../../store/reducers/header";
import { useTranslation } from "react-i18next";
import { setDesktopBodyActive } from "../../store/reducers/desktopbody";
import { setStartMenuActive } from "../../store/reducers/startmenu";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export const CalendarApp = () => {
  const { t } = useTranslation();
  const isActive = useAppSelector((state) => state.appsCalendar.active);
  const isHide = useAppSelector((state) => state.appsCalendar.hide);
  const dispatch = useAppDispatch();
  const icon = useAppSelector((state) => state.appearance.iconTheme);

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.keyCode === 50) {
      dispatch(setActive(true));
    }
  });

  return (
    <DockItem
      id="calendar"
      className={`CalendarApp ${isActive && "clicked"} ${isHide && "hide"}`}
      title={t("apps.calendar.name")}
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/calendar.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/calendar.svg"
      }
      menu={[
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

export const CalendarStartApp = () => {
  const { t } = useTranslation();
  const isHide = useAppSelector((state) => state.appsCalendar.hide);
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
      key="calendar"
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/calendar.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/calendar.svg"
      }
      name={t("apps.calendar.name")}
      onClick={toggle}
    />
  );
};

export default function Calendar() {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((state) => state.appsCalendar.active);
  const isHide = useAppSelector((state) => state.appsCalendar.hide);
  const { t } = useTranslation();
  const [min, isMin] = useState<boolean>(false);
  const shellTheme = useAppSelector((state) => state.shell.theme);

  const weekDays = [
    t("apps.calendar.weekDays.sunday"),
    t("apps.calendar.weekDays.monday"),
    t("apps.calendar.weekDays.tuesday"),
    t("apps.calendar.weekDays.wednesday"),
    t("apps.calendar.weekDays.thursday"),
    t("apps.calendar.weekDays.friday"),
    t("apps.calendar.weekDays.saturday"),
  ];
  const todayObj = dayjs();

  const [dayObj, setDayObj] = useState(dayjs());

  const thisYear = dayObj.year();
  const thisMonth = dayObj.month(); // (January as 0, December as 11)
  const daysInMonth = dayObj.daysInMonth();

  const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`);
  const weekDayOf1 = dayObjOf1.day(); // (Sunday as 0, Saturday as 6)

  const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`);
  const weekDayOfLast = dayObjOfLast.day();

  return (
    <div className="CalendarWindow">
      <Draggable handle=".TopBar">
        <div
          className={`Window calendar ${isActive && "active"} ${
            isHide && "hide"
          } ${min && "minimize"}`}
        >
          <TopBar
            title={t("apps.calendar.name")}
            onDblClick={() => isMin(!min)}
          >
            <div className="TabBarWrapper">
              <div className="TabBar">
                <div className="TabBarItem">
                  <div
                    className="TabBarInteraction"
                    style={{ marginRight: "7px " }}
                  >
                    <i
                      className="fa-regular fa-chevron-left"
                      onClick={() => setDayObj(dayObj.subtract(1, "month"))}
                    />
                  </div>
                  <p>{dayObj.format("MMM DD, YYYY")}</p>
                  <div
                    className="TabBarInteraction"
                    style={{ marginLeft: "7px " }}
                  >
                    <i
                      className="fa-regular fa-chevron-right"
                      onClick={() => setDayObj(dayObj.add(1, "month"))}
                    />
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
              <TopBarInteraction
                action="close"
                onClose={() => dispatch(setActive(false))}
              />
            </div>
          </TopBar>
          <WindowBody>
            <div
              className={`Calendar ${
                shellTheme === "WhiteSur" ? "whitesur" : ""
              }`}
            >
              <div className="CalendarHeader">
                {weekDays.map((d) => (
                  <div className="WeekCell">
                    <p key={d} style={{ float: "right" }}>
                      {d}
                    </p>
                  </div>
                ))}
              </div>
              <div className="CalendarDate">
                {range(weekDayOf1).map((i) => (
                  <div className="CalendarDateCell">
                    <p className="fade" key={i}>
                      {dayObjOf1.subtract(weekDayOf1 - i, "day").date()}
                    </p>
                  </div>
                ))}

                {range(daysInMonth).map((i) => (
                  <div className="CalendarDateCell">
                    <p
                      className={
                        i + 1 === todayObj.date() &&
                        thisMonth === todayObj.month() &&
                        thisYear === todayObj.year()
                          ? " today"
                          : ""
                      }
                      key={i}
                    >
                      {i + 1}
                    </p>
                  </div>
                ))}

                {range(6 - weekDayOfLast).map((i) => (
                  <div className="CalendarDateCell">
                    <p className="fade" key={i}>
                      {dayObjOfLast.add(i + 1, "day").date()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </WindowBody>
        </div>
      </Draggable>
    </div>
  );
}
