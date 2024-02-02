import { useState } from "react";
import "@/components/utils/window/Window.scss";
import TopBar from "@/components/utils/window/TopBar";
import WindowBody from "@/components/utils/window/WindowBody";
import "./assets/calendar.scss";
import TopBarInteraction from "@/components/utils/window/TopBarInteraction";
import dayjs from "dayjs";
import range from "lodash-es/range";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeApp,
  enterFullScreen,
  hideApp,
  maximizeApp,
  minimizeApp,
} from "@/store/reducers/apps";

export default function Calendar({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const appIsActive = useAppSelector((state) => state.apps.appIsActive);
  const fullscreen = useAppSelector((state) => state.apps.fullscreen);
  const isActive = appIsActive[id].status === "active";
  const isHide = appIsActive[id].status === "hide";
  const isMinimized = appIsActive[id].minimized;
  const isFullScreen = fullscreen === id;
  const { t } = useTranslation();
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
      <Draggable handle="#TopBar">
        <div
          className={`Window calendar ${isActive && "active"} ${
            isHide && "hide"
          } ${isMinimized && "minimize"} ${isFullScreen && "fullscreen"}`}
        >
          <TopBar
            title={t(`apps.${id}.name`)}
            onDblClick={() =>
              isMinimized
                ? dispatch(maximizeApp(id))
                : dispatch(minimizeApp(id))
            }
          >
            <div className="TabBarWrapper" style={{ pointerEvents: "none" }}>
              <div className="TabBar" style={{ pointerEvents: "none" }}>
                <div className="TabBarItem" style={{ pointerEvents: "none" }}>
                  <div
                    className="TabBarInteraction"
                    style={{ marginRight: "7px " }}
                  >
                    <i
                      className="fa-regular fa-chevron-left"
                      onClick={() => setDayObj(dayObj.subtract(1, "month"))}
                    />
                  </div>
                  <p style={{ pointerEvents: "none" }}>
                    {dayObj.format("MMM DD, YYYY")}
                  </p>
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
              <TopBarInteraction
                action="close"
                onClose={() => dispatch(closeApp(id))}
              />
            </div>
          </TopBar>
          <WindowBody>
            <div
              className={`Calendar ${
                shellTheme === "WhiteSur" ? "whitesur" : ""
              }`}
            >
              {isFullScreen && (
                <div className="TopBar">
                  <div className="TopBarInteractionContainer">
                    <div className="TabBarWrapper">
                      <div className="TabBar">
                        <div className="TabBarItem">
                          <div
                            className="TabBarInteraction"
                            style={{ marginRight: "7px" }}
                          >
                            <i
                              className="fa-regular fa-chevron-left"
                              onClick={() =>
                                setDayObj(dayObj.subtract(1, "month"))
                              }
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
                  </div>
                </div>
              )}
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
