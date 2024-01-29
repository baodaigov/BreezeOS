import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDirectory } from "@/store/reducers/files";
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
  const iconSize = useAppSelector((state) => state.files.iconSize);
  const nameLine = name.split(".");
  const [isActive, setIsActive] = useState<boolean>(false);
  // const [isRename, setIsRename] = useState<boolean>(false);
  const [contextMenuDisplayed, setContextMenuDisplayed] =
    useState<boolean>(false);

  function useOutsideFilesItem(ref: React.RefObject<HTMLElement>) {
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

  function useOutsideContextMenu(ref: React.RefObject<HTMLElement>) {
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
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg";
      case "gitignore":
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg";
      case "conf":
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg";
      case "png":
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/image-x-generic.svg";
      case "jpg":
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/image-x-generic.svg";
      case "ico":
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/image-x-generic.svg";
      case "pptx":
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/x-office-presentation.svg";
      case "mp4":
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/video-x-generic.svg";
      case "cpp":
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-cpp.svg";
      case "html":
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-html.svg";
      default:
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-preview.svg";
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
                ? "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg"
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
              ? "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg"
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
