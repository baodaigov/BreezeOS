import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBody from "../../components/utils/window/WindowBody";
import "./assets/imgview.scss";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import { useTranslation } from "react-i18next";
import { openPic } from "../../reducers/imgview";
import Draggable from "react-draggable";

export default function ImgView() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const picLocation = useSelector((state) => state.imgview.location);
  const pic = useSelector((state) => state.imgview.pic);

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
          <TopBar title={`${t("apps.imgview.name")} – ${picLocation}`}>
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
