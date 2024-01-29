import { useEffect, useState } from "react";
import "@/components/utils/window/Window.scss";
import TopBar from "@/components/utils/window/TopBar";
import WindowBody from "@/components/utils/window/WindowBody";
import "./assets/clock.scss";
import TopBarInteraction from "@/components/utils/window/TopBarInteraction";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Hammer from "react-hammerjs";
import {
  closeApp,
  enterFullScreen,
  hideApp,
  maximizeApp,
  minimizeApp,
} from "@/store/reducers/apps";

export default function Clock({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const appIsActive = useAppSelector((state) => state.apps.appIsActive);
  const fullscreen = useAppSelector((state) => state.apps.fullscreen);
  const isActive = appIsActive[id].status === "active";
  const isHide = appIsActive[id].status === "hide";
  const isMinimized = appIsActive[id].minimized;
  const isFullScreen = fullscreen === id;
  const hour12 = useAppSelector((state) => state.time.hour12);
  const { t } = useTranslation();
  const [tab, setTab] = useState<string>("worldclock");
  const [translateX, setTranslateX] = useState<string>("");
  const [width, setWidth] = useState<string>("103px");
  const [value, setValue] = useState<string>("1");

  function worldClockTab() {
    setTranslateX("translate(0)");
    setWidth("103px");
    setValue("1");
    setTab("worldclock");
  }

  function alarmTab() {
    setTranslateX("translate(106px)");
    setWidth("70px");
    setValue("2");
    setTab("alarm");
  }

  function stopwatchTab() {
    setTranslateX("translate(180.4px)");
    setWidth("97px");
    setValue("3");
    setTab("stopwatch");
  }

  function timerTab() {
    setTranslateX("translate(280px)");
    setWidth("72px");
    setValue("4");
    setTab("timer");
  }

  interface ClockItemProps {
    timeZone: string;
    title: string;
  }

  const ClockItem = ({ timeZone, title }: ClockItemProps) => {
    const [curTime, setCurTime] = useState<string | null>(null);
    const [curDate, setCurDate] = useState<string | null>(null);

    useEffect(() => {
      if (curTime === null && curDate === null) {
        setCurTime(
          new Date().toLocaleString("en-US", {
            timeZone: `${timeZone}`,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: hour12,
          }),
        );

        setCurDate(
          new Date().toLocaleDateString("en-US", {
            timeZone: `${timeZone}`,
            dateStyle: "full",
          }),
        );
      } else {
        setInterval(() => {
          setCurTime(
            new Date().toLocaleString("en-US", {
              timeZone: `${timeZone}`,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: hour12,
            }),
          );

          setCurDate(
            new Date().toLocaleDateString("en-US", {
              timeZone: `${timeZone}`,
              dateStyle: "full",
            }),
          );
        }, 1000);
      }
    }, [curTime, curDate]);

    return (
      <div className="ClockItem">
        <div className="ClockInfo">
          <p className="ClockTitle">{title}</p>
          <p className="ClockDesc">{curDate}</p>
        </div>
        <div>
          <div className="ClockTime">
            <p className="font-bold">{curTime}</p>
          </div>
        </div>
      </div>
    );
  };

  const [alarm, setAlarm] = useState<{ id: string; time: string }[]>([]);
  const [alarmSettings, showAlarmSettings] = useState<boolean>(false);
  const [settings, allowSettings] = useState<boolean>(false);

  function addNewAlarm() {
    setAlarm([
      ...alarm,
      {
        id: `Alarm ${alarm.length + 1}`,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      },
    ]);
    showAlarmSettings(false);
  }

  function removeAlarm(index: number) {
    const deleteAlarm = alarm?.filter((_element, i) => i !== index);
    setAlarm(deleteAlarm);
  }

  function editAlarm() {
    allowSettings(!settings);
    showAlarmSettings(false);
  }

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (running === true) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (running === false) {
      clearInterval(interval);
      setTime(0);
    }
    return () => clearInterval(interval);
  }, [running]);

  function close() {
    dispatch(closeApp(id));
    setTimeout(() => {
      setRunning(false);
    }, 300);
  }

  function switchTab() {
    switch (tab) {
      case "worldclock":
        return (
          <div className="world-clock">
            <ClockItem
              title="Ho Chi Minh City, Vietnam"
              timeZone="Asia/Ho_Chi_Minh"
            />
            <ClockItem
              title="London, United Kingdom"
              timeZone="Europe/London"
            />
          </div>
        );
      case "alarm":
        return (
          <div className="alarm">
            <div className="AlarmClock">
              {alarm.length != 0 ? (
                <div className="AlarmContainer">
                  {alarm.map((e, index) => (
                    <div className="AlarmContainerItem">
                      {settings ? (
                        <div className="AlarmSettings">
                          <i className="fa-regular fa-bars reorder" />
                          <i
                            className="fa-regular fa-dash delete"
                            onClick={() => removeAlarm(index)}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <p className="AlarmContainerTitle">{e.id}</p>
                        <p className="AlarmContainerTime">{e.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="NoAlarm">
                  <i
                    className="fa-regular fa-alarm-clock"
                    style={{ fontSize: "80px", margin: "20px" }}
                  />
                  <p style={{ fontWeight: "700", fontSize: "20px" }}>
                    No Alarm
                  </p>
                </div>
              )}
              {alarmSettings ? (
                <>
                  <div
                    className="AlarmItem showSettings"
                    onClick={() => showAlarmSettings(false)}
                  >
                    <i className="fa-regular fa-xmark" />
                  </div>
                  <div
                    className={`AlarmItem ${
                      alarm.length === 0 ? "disable" : ""
                    } edit`}
                    onClick={editAlarm}
                  >
                    <p className="AlarmItemTitle">Edit</p>
                    <i className="fa-regular fa-pen" />
                  </div>
                  <div
                    className="AlarmItem settings"
                    onClick={() => showAlarmSettings(false)}
                  >
                    <p className="AlarmItemTitle">Settings</p>
                    <i className="fa-regular fa-gear" />
                  </div>
                </>
              ) : settings ? (
                <div
                  className="AlarmItem done"
                  onClick={() => allowSettings(false)}
                >
                  <i className="fa-regular fa-check" />
                </div>
              ) : (
                <Hammer
                  onTap={addNewAlarm}
                  onPress={() => showAlarmSettings(true)}
                >
                  <div className="AlarmItem">
                    <i className="fa-regular fa-plus" />
                  </div>
                </Hammer>
              )}
            </div>
          </div>
        );
      case "stopwatch":
        return (
          <div className="stopwatch">
            <div className="StopwatchTimer">
              <div style={{ textAlign: "center", width: "90px" }}>
                <span className="active">
                  {("0" + Math.floor((time / 60000) % 60)).slice(-2)}
                </span>
              </div>
              <span className={running ? "blinking" : ""}>:</span>
              <div
                style={{
                  textAlign: "center",
                  width: "180px",
                  display: "flex",
                }}
              >
                <span className="active">
                  {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                </span>
                <div>
                  .
                  <span className="StopwatchMs">
                    {("0" + Math.floor((time / 10) % 100)).slice(-2)}
                  </span>
                </div>
              </div>
            </div>
            {running ? (
              <div
                className="StopwatchButton stop"
                onClick={() => setRunning(false)}
              >
                Stop
              </div>
            ) : (
              <div
                className="StopwatchButton start"
                onClick={() => setRunning(true)}
              >
                Start
              </div>
            )}
          </div>
        );
      case "timer":
        return (
          <div className="timer">
            <p>Nothing in this section.</p>
          </div>
        );
    }
  }

  return (
    <div className="ClockWindow">
      <Draggable handle="#TopBar">
        <div
          className={`Window clock ${isActive && "active"} ${
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
          </TopBar>
          <WindowBody>
            <div className={`Clock ${alarmSettings ? "blackscr" : ""}`}>
              <div className="ClockItems">{switchTab()}</div>
              <div className="ClockMenu" data-value={value}>
                <div className="ClockMenuInside">
                  <div
                    className="ClockMenuItem world-clock"
                    onClick={worldClockTab}
                  >
                    <i className="fa-regular fa-globe" />
                    <p>World Clock</p>
                  </div>
                  <div className="ClockMenuItem alarm-clock" onClick={alarmTab}>
                    <i className="fa-regular fa-alarm-clock" />
                    <p>Alarm</p>
                  </div>
                  <div
                    className="ClockMenuItem stopwatch"
                    onClick={stopwatchTab}
                  >
                    <i className="fa-regular fa-stopwatch" />
                    <p>Stopwatch</p>
                  </div>
                  <div className="ClockMenuItem timer" onClick={timerTab}>
                    <i className="fa-regular fa-timer" />
                    <p>Timer</p>
                  </div>
                  <div
                    className="ClockSlider"
                    style={{ width: width, transform: translateX }}
                  ></div>
                </div>
              </div>
            </div>
          </WindowBody>
        </div>
      </Draggable>
    </div>
  );
}
