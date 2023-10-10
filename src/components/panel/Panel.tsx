import { setActive, setSettings } from "@/store/reducers/apps/settings";
import { inactivePanel } from "@/store/reducers/panel";
import { insertPasswordFor } from "@/store/reducers/wifipassword";
import { switchType } from "@/store/reducers/panel";
import { toggleBluetooth, toggleWifi } from "@/store/reducers/settings";
import { toggleActive } from "@/store/reducers/newwifi";
import "./Panel.scss";
import PanelTop from "./PanelTop";
import PanelBottom from "./PanelBottom";
import Toggle from "@/components/utils/toggle/Toggle";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {}

const Panel = ({ ...props }: PanelProps) => {
  const isActive = useAppSelector((state) => state.panel.active);
  const panelType = useAppSelector((state) => state.panel.type);
  const settings = useAppSelector((state) => state.settings);
  const shellTheme = useAppSelector((state) => state.shell.theme);
  const dispatch = useAppDispatch();

  function connectWifi(e: string) {
    dispatch(inactivePanel());
    dispatch(setActive(true));
    setTimeout(() => {
      dispatch(insertPasswordFor(e));
    }, 800);
  }

  function connectOtherWifi() {
    dispatch(inactivePanel());
    dispatch(setActive(true));
    dispatch(setSettings("Wi-Fi"));
    dispatch(toggleActive(true));
  }

  return (
    <div
      className={`Panel ${isActive && "active"} ${
        shellTheme === "WhiteSur" ? "whitesur" : ""
      }`}
      {...props}
    >
      <div style={{ position: "relative" }}>
        <div
          className="PanelTypeContainer"
          style={{
            transform: `translateX(${
              panelType === "default"
                ? "0"
                : panelType === "wifi"
                ? "-330px"
                : panelType === "bluetooth"
                ? "-653px"
                : "0"
            })`,
          }}
        >
          <div
            className={`defaultPanel ${
              panelType === "default" ? "active" : ""
            }`}
          >
            <PanelTop />
            <PanelBottom />
          </div>
          <div className={`wifiPanel ${panelType === "wifi" ? "active" : ""}`}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "324px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className="PanelItem PanelItemInteraction"
                  onClick={() => dispatch(switchType("default"))}
                >
                  <i
                    className="fa-solid fa-chevron-left"
                    style={{ marginRight: "0" }}
                  />
                </div>
                <p className="PanelName">Wi-Fi</p>
              </div>
              <Toggle
                active={settings.wifi}
                onToggle={() => dispatch(toggleWifi())}
              />
            </div>
            {settings.wifi ? (
              <div className="WifiList">
                {settings.wifiList.map((i) => (
                  <>
                    {i.connected ? (
                      <div className="WifiListItem">
                        <p className="WifiName">{i.name}</p>
                        <div className="WifiListIcon">
                          <i className="fa-solid fa-check" />
                          {i.private ? <i className="fa-solid fa-lock" /> : ""}
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
                    ) : (
                      <div
                        className="WifiListItem"
                        onClick={() => connectWifi(i.name)}
                      >
                        <p className="WifiName">{i.name}</p>
                        <div className="WifiListIcon">
                          {i.private ? <i className="fa-solid fa-lock" /> : ""}
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
                    )}
                  </>
                ))}
                <div className="WifiListItem" onClick={connectOtherWifi}>
                  <p className="WifiName">Other...</p>
                </div>
              </div>
            ) : (
              <div className="WifiStatusFalse">
                <i className="fa-solid fa-wifi-slash" />
                <p className="Title font-bold">Wi-Fi Has Turned Off</p>
              </div>
            )}
          </div>
          <div
            className={`bluetoothPanel ${
              panelType === "bluetooth" ? "active" : ""
            }`}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "324px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className="PanelItem PanelItemInteraction"
                  onClick={() => dispatch(switchType("default"))}
                >
                  <i
                    className="fa-solid fa-chevron-left"
                    style={{ marginRight: "0" }}
                  />
                </div>
                <p className="PanelName">Bluetooth</p>
              </div>
              <Toggle
                active={settings.bluetooth}
                onToggle={() => dispatch(toggleBluetooth())}
              />
            </div>
            {settings.bluetooth ? (
              <p className="Description">
                Now discoverable as "{settings.deviceName}"
              </p>
            ) : (
              <div className="BluetoothStatusFalse">
                <i className="fa-solid fa-bluetooth" />
                <p className="Title font-bold">Bluetooth Has Turned Off</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
