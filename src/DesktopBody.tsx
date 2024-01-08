import "./Desktop.scss";
import Window from "./components/utils/window/Window";
import Widget from "./components/Widget";
import { useAppSelector } from "./store/hooks";
import { useAppDispatch } from "@/store/hooks";
import { useEffect, useRef, useState } from "react";
import { setActive, setSettings } from "./store/reducers/apps/settings";
import ActMenu, {
  ActMenuSelector,
} from '@/components/utils/menu';

const DesktopBody = () => {
  const isActive = useAppSelector((state) => state.desktopbody.active);
  const isHide = useAppSelector((state) => state.desktopbody.hide);
  const dispatch = useAppDispatch();
  const [contextMenuDisplayed, setContextMenuDisplayed] =
    useState<boolean>(false);
  const [contextMenuPos, setContextMenuPos] = useState({
    x: 0,
    y: 0,
  });

  function useOutsideContextMenu(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setContextMenuDisplayed(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const contextMenuRef = useRef(null);
  useOutsideContextMenu(contextMenuRef);

  function displayContextMenu(e: React.MouseEvent<HTMLDivElement>) {
    setContextMenuDisplayed(true);
    setContextMenuPos({
      x: e.clientX,
      y: e.clientY - 50,
    });
  }

  return (
    <div className={`DesktopBody ${isActive && "active"} ${isHide && "hide"}`}>
      <div
        style={{ width: "100vw", height: "calc(100vh - 105px)" }}
        onContextMenu={displayContextMenu}
      >
        <ActMenu
          style={{
            position: "absolute",
            zIndex: "1",
            width: "200px",
            top: contextMenuPos.y,
            left: contextMenuPos.x,
            transition: "opacity ease .1s",
          }}
          className={`ContextMenu ${contextMenuDisplayed ? 'active' : ''}`}
          ref={contextMenuRef}
        >
          <ActMenuSelector
            title="Change wallpaper"
            onClose={() => setContextMenuDisplayed(false)}
            onClick={() => {
              dispatch(setActive(true));
              dispatch(setSettings('Appearance'));
            }}
          />
          <ActMenuSelector
            title="Settings..."
            onClose={() => setContextMenuDisplayed(false)}
            onClick={() => dispatch(setActive(true))}
          />
        </ActMenu>
      </div>
      <Widget />
      <Window />
    </div>
  );
};

export default DesktopBody;
