import "./Window.scss";

interface TopBarInteractionProps {
  action: string;
  onClose?: React.MouseEventHandler<HTMLDivElement>;
  onHide?: React.MouseEventHandler<HTMLDivElement>;
  onMinMax?: React.MouseEventHandler<HTMLDivElement>;
}

export default function TopBarInteraction({
  action,
  onClose,
  onHide,
  onMinMax,
}: TopBarInteractionProps) {
  function switchAction() {
    switch (action) {
      case "close":
        return (
          <div
            className={`TopBarInteraction ${action}`}
            key={action}
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark fa-lg" />
          </div>
        );

      case "hide":
        return (
          <div
            className={`TopBarInteraction ${action}`}
            key={action}
            onClick={onHide}
          >
            <i className="fa-solid fa-chevron-down" />
          </div>
        );

      case "min":
        return (
          <div
            className={`TopBarInteraction ${action}`}
            key={action}
            onClick={onMinMax}
          >
            <i className="fa-regular fa-window-restore fa-sm" />
          </div>
        );

      case "max":
        return (
          <div
            className={`TopBarInteraction ${action}`}
            key={action}
            onClick={onMinMax}
          >
            <i className="fa-regular fa-window-maximize fa-sm" />
          </div>
        );
    }
  }

  return switchAction();
}
