import { useEffect, useRef, useState } from "react";
import Hammer from "react-hammerjs";
import "./Dock.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hideApp, openApp, quitApp, showApp } from "@/store/reducers/apps";

interface DockItemProps {
  id: string;
  title: string;
  icon: string;
  onClick?: HammerListener;
}

export default function DockItem({ id, title, icon, onClick }: DockItemProps) {
  const dispatch = useAppDispatch();
  const [contextMenuDisplayed, setDisplayContextMenu] =
    useState<boolean>(false);

  function useOutsideMenu(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDisplayContextMenu(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const menuRef = useRef(null);
  useOutsideMenu(menuRef);

  const menu = useAppSelector((state) => state.apps.menu);
  const appIsActive = useAppSelector((state) => state.apps.appIsActive);
  const activeStatus = appIsActive[id]?.status === "active";
  const hideStatus = appIsActive[id]?.status === "hide";

  return (
    <div className="DockItemContainer">
      <div
        className={`DockItem ${
          appIsActive[id] && (activeStatus ? "active" : "inactive")
        }`}
      >
        <div
          className={`ContextMenu ${contextMenuDisplayed && "active"}`}
          ref={menuRef}
        >
          <div className="ContextMenuItemContainer">
            {menu[id]?.map((i) => (
              <div
                className={`ContextMenuItem ${i.description && "expand"} ${
                  i.disabled && "disabled"
                }`}
                onMouseUp={() => setDisplayContextMenu(false)}
                onClick={i.action}
              >
                <p>{i.label}</p>
                <p className="Description">{i.description}</p>
              </div>
            ))}
            {appIsActive[id] ? (
              <>
                {hideStatus || !activeStatus ? (
                  <div
                    className="ContextMenuItem"
                    onMouseUp={() => setDisplayContextMenu(false)}
                    onClick={() => dispatch(showApp(id))}
                  >
                    <p>Show</p>
                  </div>
                ) : (
                  <div
                    className="ContextMenuItem"
                    onMouseUp={() => setDisplayContextMenu(false)}
                    onClick={() => dispatch(hideApp(id))}
                  >
                    <p>Hide</p>
                  </div>
                )}
                <div
                  className="ContextMenuItem"
                  onMouseUp={() => setDisplayContextMenu(false)}
                  onClick={() => dispatch(quitApp(id))}
                >
                  <p>Quit</p>
                </div>
              </>
            ) : (
              <div
                className="ContextMenuItem"
                onMouseUp={() => setDisplayContextMenu(false)}
                onClick={() => dispatch(openApp(id))}
              >
                <p>Open</p>
              </div>
            )}
          </div>
        </div>
        {!contextMenuDisplayed && <p className="DockItemTitle">{title}</p>}
        <Hammer
          onTap={onClick}
          onPress={() => setDisplayContextMenu(!contextMenuDisplayed)}
          options={{
            recognizers: {
              press: {
                time: 350,
              },
            },
          }}
        >
          <img
            src={icon}
            onContextMenu={() => setDisplayContextMenu(!contextMenuDisplayed)}
          />
        </Hammer>
      </div>
    </div>
  );
}
