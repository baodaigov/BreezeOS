import { useEffect, useRef, useState } from "react";
import Hammer from "react-hammerjs";
import "./Dock.scss";

interface DockItemProps {
  className?: string;
  id?: string;
  redirectTo?: string;
  menu?: {
    label: string;
    description?: string;
    disabled?: boolean;
    action?: React.MouseEventHandler<HTMLDivElement>;
  }[][];
  title: string;
  icon: string;
  onClick?: HammerListener;
}

export default function DockItem({
  className,
  id,
  redirectTo,
  menu,
  title,
  icon,
  onClick,
}: DockItemProps) {
  const [contextMenuDisplayed, setDisplayContextMenu] = useState<boolean>(false);

  function useOutsideMenu(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDisplayContextMenu(false);
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

  const menuRef = useRef(null);
  useOutsideMenu(menuRef);

  return (
    <div className="DockItemContainer">
      <div
        className={`DockItem ${className}`}
        id={id}
        key={id}
        onClick={() => (redirectTo ? (window.location.href = redirectTo) : "")}
      >
        <div
          className={`ContextMenu ${contextMenuDisplayed && "active"}`}
          ref={menuRef}
        >
          {menu?.map((i) => (
            <div className="ContextMenuItemContainer">
              {i.map((j) => (
                <div
                  className={`ContextMenuItem ${j.description && "expand"} ${
                    j.disabled && "disabled"
                  }`}
                  onMouseUp={() => setDisplayContextMenu(false)}
                  onClick={j.action}
                >
                  <p>{j.label}</p>
                  <p className="Description">{j.description}</p>
                </div>
              ))}
            </div>
          ))}
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
            width={37}
            height={37}
            onContextMenu={() => setDisplayContextMenu(!contextMenuDisplayed)}
          />
        </Hammer>
      </div>
    </div>
  );
}
