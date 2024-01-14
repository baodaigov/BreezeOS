import { useEffect, useRef } from "react";
import { activePanel, inactivePanel } from "../../store/reducers/panel";
import Panel from "../panel/Panel";
import "@/Desktop.scss";
import "../Header.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface TaskProps extends React.HTMLAttributes<HTMLDivElement> {}

const Task = ({ children }: TaskProps) => {
  const panelActive = useAppSelector((state) => state.panel.active);
  const dispatch = useAppDispatch();

  function useOutsidePanel(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(inactivePanel());
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
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
        onMouseDown={() => (panelActive ? undefined : dispatch(activePanel()))}
        ref={panelRef}
      >
        {children}
        <Panel />
      </div>
    </>
  );
};

export default Task;
