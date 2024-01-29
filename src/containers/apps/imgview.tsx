import "@/components/utils/window/Window.scss";
import TopBar from "@/components/utils/window/TopBar";
import WindowBody from "@/components/utils/window/WindowBody";
import "./assets/imgview.scss";
import TopBarInteraction from "@/components/utils/window/TopBarInteraction";
import { useTranslation } from "react-i18next";
import { setLocation } from "@/store/reducers/imgview";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeApp } from "@/store/reducers/apps";

export default function ImgView({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const appIsActive = useAppSelector((state) => state.apps.appIsActive);
  const isActive = appIsActive[id].status === "active";
  const picLocation = useAppSelector((state) => state.imgview.location);
  const pic = useAppSelector((state) => state.imgview.pic);

  function close() {
    dispatch(closeApp(id));
    setTimeout(() => dispatch(setLocation("")), 300);
  }

  return (
    <div className="ImgViewWindow">
      <Draggable handle="#TopBar">
        <div className={`Window imgview ${isActive && "active"}`}>
          <TopBar
            title={`${t(`apps.${id}.name`)}${
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
