import { useEffect, useRef, useState } from "react";
import "./Dock.scss";

export default function DockItem(props) {
  const [contextMenuDisplayed, setDisplayContextMenu] = useState(false);

  function useOutsideMenu(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
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
        className={`DockItem ${props.className}`}
        id={props.id}
        key={props.id}
        onClick={() =>
          props.redirectTo ? (window.location.href = props.redirectTo) : ""
        }
      >
        <div
          className={`ContextMenu ${contextMenuDisplayed && "active"}`}
          ref={menuRef}
        >
          {props.menu?.map((i) => (
            <div className="ContextMenuItemContainer">
              {i.map((j) => (
                <div className={`ContextMenuItem ${j.disabled && "disabled"}`} onClick={j.action}>
                  <p>{j.label}</p>
                  <p className="Description">{j.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        {!contextMenuDisplayed && <p className="DockItemTitle">{props.title}</p>}
        <img
          src={props.icon}
          width={37}
          height={37}
          onClick={props.onClick}
          onContextMenu={() => setDisplayContextMenu(!contextMenuDisplayed)}
        />
      </div>
    </div>
  );
}