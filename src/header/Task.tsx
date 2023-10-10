import { useEffect, useRef } from "react";
import { activePanel, inactivePanel } from "../store/reducers/panel";
import Panel from "../components/panel/Panel";
import "../Desktop.scss";
import "../components/Header.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface TaskProps extends React.HTMLAttributes<HTMLDivElement> {}

const Task = ({ children }: TaskProps) => {
  const panelActive = useAppSelector((state) => state.panel.active);
  const panelType = useAppSelector((state) => state.panel.type);
  const dispatch = useAppDispatch();

  function useOutsidePanel(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(inactivePanel());
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const panelRef = useRef(null);
  useOutsidePanel(panelRef);

  return (
    <>
      <div
        className={`Task Header-item ${panelActive ? "active" : ""}`}
        onMouseDown={() => (panelActive ? "" : dispatch(activePanel()))}
        ref={panelRef}
      >
        {children}
        <Panel
          style={{
            height:
              panelType === "default"
                ? "340px"
                : panelType === "wifi"
                ? "545px"
                : panelType === "bluetooth"
                ? "545px"
                : "340px",
          }}
        />
      </div>
    </>
  );
};

export default Task;
