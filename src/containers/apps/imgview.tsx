import { useEffect, useState } from "react";
import "@/components/utils/window/Window.scss";
import TopBar from "@/components/utils/window/TopBar";
import WindowBody from "@/components/utils/window/WindowBody";
import "./assets/imgview.scss";
import TopBarInteraction from "@/components/utils/window/TopBarInteraction";
import { useTranslation } from "react-i18next";
import { openPic } from "@/store/reducers/imgview";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function ImgView() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState<boolean>(false);
  const picLocation = useAppSelector((state) => state.imgview.location);
  const pic = useAppSelector((state) => state.imgview.pic);

  useEffect(() => {
    if (pic !== "") {
      setTimeout(() => setIsActive(true), 100);
    }
  }, [pic]);

  function close() {
    setIsActive(false);
    setTimeout(() => dispatch(openPic("")), 300);
  }

  return (
    <div className="ImgViewWindow">
      <Draggable handle=".TopBar">
        <div className={`Window imgview ${isActive && "active"}`}>
          <TopBar
            title={`${t("apps.imgview.name")}${
              picLocation && ` – ${picLocation}`
            }`}
          >
            <TopBarInteraction action="close" onClose={close} />
          </TopBar>
          <WindowBody>
            <div className="ImgView">
              <img src={pic} />
            </div>
          </WindowBody>
        </div>
      </Draggable>
    </div>
  );
}
