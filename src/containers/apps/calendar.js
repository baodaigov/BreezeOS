import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActive, setHide } from "../../reducers/apps/calendar";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBody from "../../components/utils/window/WindowBody";
import DockItem from "../../components/DockItem";
import "./assets/calendar.scss";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import StartApp from "../../components/startMenu/StartApp";
import dayjs from "dayjs";
import range from "lodash-es/range";
import { setHeaderActive } from "../../reducers/header";

export const CalendarApp = () => {
  const isActive = useSelector((state) => state.appsCalendar.active);
  const isHide = useSelector((state) => state.appsCalendar.hide);
  const dispatch = useDispatch();
  const icon = useSelector((state) => state.appearance.iconTheme);

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.keyCode === 50) {
      dispatch(setActive(true));
    }
  });

  useEffect(() => {
    if (isActive) {
      document
        .getElementsByClassName("CalendarApp")[0]
        .classList.add("clicked");
      setTimeout(
        () =>
          document
            .getElementsByClassName("calendar")[0]
            .classList.add("active"),
        500
      );
    } else {
      document
        .getElementsByClassName("CalendarApp")[0]
        .classList.remove("clicked");
      document.getElementsByClassName("calendar")[0].classList.remove("active");
    }
    if (isHide) {
      document.getElementsByClassName("CalendarApp")[0].classList.add("hide");
      document.getElementsByClassName("calendar")[0].classList.add("hide");
    } else {
      document
        .getElementsByClassName("CalendarApp")[0]
        .classList.remove("hide");
      document.getElementsByClassName("calendar")[0].classList.remove("hide");
    }
  }, [isActive, isHide]);

  return (
    <DockItem
      id="calendar"
      className="CalendarApp"
      title="Calendar"
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/calendar.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/calendar.svg"
      }
      menu={[
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

export const CalendarStartApp = () => {
  const isHide = useSelector((state) => state.appsCalendar.hide);
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
      key="calendar"
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/calendar.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/calendar.svg"
      }
      name="Calendar"
      onClick={toggle}
    />
  );
};

export default function Calendar() {
  const dispatch = useDispatch();

  const CalendarWindow = () => {
    const [min, isMin] = useState(false);
    const shellTheme = useSelector((state) => state.shell.theme);

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const todayObj = dayjs();

    const [dayObj, setDayObj] = useState(dayjs());

    const thisYear = dayObj.year();
    const thisMonth = dayObj.month(); // (January as 0, December as 11)
    const daysInMonth = dayObj.daysInMonth();

    const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`);
    const weekDayOf1 = dayObjOf1.day(); // (Sunday as 0, Saturday as 6)

    const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`);
    const weekDayOfLast = dayObjOfLast.day();

    const handlePrev = () => {
      setDayObj(dayObj.subtract(1, "month"));
    };

    const handleNext = () => {
      setDayObj(dayObj.add(1, "month"));
    };

    function minimize() {
      document
        .getElementsByClassName("calendar")[0]
        .classList.toggle("minimize");
      isMin(!min);
    }

    return (
      <>
        <TopBar title="Calendar" onDblClick={minimize}>
          <div className="TabBarWrapper">
            <div className="TabBar">
              <div className="TabBarItem">
                <div
                  className="TabBarInteraction"
                  style={{ marginRight: "7px " }}
                >
                  <i
                    className="fa-regular fa-chevron-left"
                    onClick={handlePrev}
                  ></i>
                </div>
                <p>{dayObj.format("MMM DD, YYYY")}</p>
                <div
                  className="TabBarInteraction"
                  style={{ marginLeft: "7px " }}
                >
                  <i
                    className="fa-regular fa-chevron-right"
                    onClick={handleNext}
                  ></i>
                </div>
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
      </>
    );
  };

  return (
    <div className="CalendarWindow">
      <div className="Window calendar" key={Math.random()}>
        <CalendarWindow />
      </div>
    </div>
  );
}
