import "./Window.scss";
import Hammer from "react-hammerjs";

interface TopBarInteractionProps {
  action: string;
  onClose?: React.MouseEventHandler<HTMLDivElement>;
  onHide?: React.MouseEventHandler<HTMLDivElement>;
  onMinMax?: HammerListener;
  onPress?: HammerListener;
}

export default function TopBarInteraction({
  action,
  onClose,
  onHide,
  onMinMax,
  onPress,
}: TopBarInteractionProps) {
  function switchAction() {
    switch (action) {
      case "close":
        return (
          <div className={`TopBarInteraction ${action}`} onClick={onClose}>
            <i className="fa-solid fa-xmark fa-lg" />
          </div>
        );

      case "hide":
        return (
          <div className={`TopBarInteraction ${action}`} onClick={onHide}>
            <i className="fa-solid fa-chevron-down" />
          </div>
        );

      case "min":
        return (
          <Hammer
            onTap={onMinMax}
            onPress={onPress}
            options={{
              recognizers: {
                press: {
                  time: 350,
                },
              },
            }}
          >
            <div className={`TopBarInteraction ${action}`}>
              <i className="fa-regular fa-window-restore fa-sm" />
            </div>
          </Hammer>
        );

      case "max":
        return (
          <Hammer
            onTap={onMinMax}
            onPress={onPress}
            options={{
              recognizers: {
                press: {
                  time: 350,
                },
              },
            }}
          >
            <div className={`TopBarInteraction ${action}`}>
              <i className="fa-regular fa-window-maximize fa-sm" />
            </div>
          </Hammer>
        );
    }
  }

  return switchAction();
}
