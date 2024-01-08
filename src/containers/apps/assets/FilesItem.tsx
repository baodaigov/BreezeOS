import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setDirectory } from "@/store/reducers/apps/files";
import ActMenu, {
  ActMenuSelector,
  ActMenuSeparator,
} from "@/components/utils/menu";
import usePathInteraction from "@/hooks/usePathInteraction";

interface FilesItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  location?: string;
  thumbnail?: string;
  content?: string;
  isDir?: boolean;
  isPermissionDenied?: boolean;
}

export default function FilesItem({
  name,
  location = "",
  thumbnail,
  content,
  isDir,
  isPermissionDenied,
  ...props
}: FilesItemProps) {
  const dispatch = useAppDispatch();
  const iconSize = useAppSelector((state) => state.appsFiles.iconSize);
  const icon = useAppSelector((state) => state.appearance.iconTheme);
  const nameLine = name.split(".");
  const [isActive, setIsActive] = useState<boolean>(false);
  // const [isRename, setIsRename] = useState<boolean>(false);
  const [contextMenuDisplayed, setContextMenuDisplayed] =
    useState<boolean>(false);

  function useOutsideFilesItem(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsActive(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const filesItemRef = useRef(null);
  useOutsideFilesItem(filesItemRef);

  function useOutsideContextMenu(ref: React.MutableRefObject<any>) {
    useEffect(() => {
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

  const nameLineLastIndex = nameLine[nameLine.length - 1];

  function switchIcon() {
    switch (nameLineLastIndex) {
      case "txt":
        return icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg";
      case "gitignore":
        return icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg";
      case "conf":
        return icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg";
      case "png":
        return icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/image-x-generic.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/image-x-generic.svg";
      case "jpg":
        return icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/image-x-generic.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/image-x-generic.svg";
      case "ico":
        return icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/image-x-generic.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/image-x-generic.svg";
      case "pptx":
        return icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/x-office-presentation.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/x-office-presentation.svg";
      case "mp4":
        return icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/video-x-generic.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/video-x-generic.svg";
      case "cpp":
        return icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/text-x-cpp.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-cpp.svg";
      case "html":
        return icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/text-html.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-html.svg";
      default:
        return icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/text-x-preview.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-preview.svg";
    }
  }

  const { executeCommandWithPath } = usePathInteraction();

  function runAction() {
    if (!isDir) {
      if (nameLineLastIndex === "png" || nameLineLastIndex === "jpg") {
        executeCommandWithPath(nameLineLastIndex, location!, thumbnail);
      } else {
        executeCommandWithPath(nameLine[nameLine.length - 1], location!);
      }
    } else {
      dispatch(setDirectory(location!));
    }
  }

  return (
    <div
      className={`FilesItem ${isActive && "active"}`}
      onMouseDown={() => setIsActive(true)}
      onDoubleClick={runAction}
      onContextMenu={() => setContextMenuDisplayed(true)}
      ref={filesItemRef}
      {...props}
    >
      <ActMenu
        style={{
          position: "absolute",
          zIndex: "1",
          width: "200px",
        }}
        className={contextMenuDisplayed ? "active" : ""}
        ref={contextMenuRef}
      >
        <div
          style={{
            margin: "10px 0 16px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            className="FilesIcon"
            style={{ marginBottom: "10px" }}
            src={
              isDir
                ? icon === "WhiteSur-icon-theme"
                  ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg"
                  : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg"
                : switchIcon()
            }
            width={iconSize + 30}
            height={iconSize + 30}
          />
          <p style={{ fontSize: "16px", margin: 0, textAlign: "center" }}>
            {name}
          </p>
        </div>
        <ActMenuSelector
          title="Open"
          delay={130}
          onClick={runAction}
          onClose={() => setContextMenuDisplayed(false)}
        />
        {!isDir && (
          <ActMenuSelector
            title="Open with..."
            onClose={() => setContextMenuDisplayed(false)}
          />
        )}
        <ActMenuSeparator />
        <ActMenuSelector
          title="Add to Favorites"
          onClose={() => setContextMenuDisplayed(false)}
        />
        <ActMenuSeparator />
      </ActMenu>
      <div className="FilesIconContainer">
        <img
          className="FilesIcon"
          src={
            isDir
              ? icon === "WhiteSur-icon-theme"
                ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg"
                : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg"
              : thumbnail
              ? thumbnail
              : switchIcon()
          }
          width={thumbnail ? "auto" : iconSize}
          height={iconSize}
        />
      </div>
      <div className="FilesNameContainer">
        <p className="FilesName">{name}</p>
      </div>
    </div>
  );
}
