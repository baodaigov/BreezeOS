import "@/components/utils/window/Window.scss";
import Draggable from "react-draggable";
import TopBar from "../window/TopBar";
import TopBarInteraction from "../window/TopBarInteraction";
import WindowBodyDefault from "../window/WindowBodyDefault";
import WindowBodyButton from "../window/WindowBodyButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBlocks } from "@/store/reducers/msgbox";

export default function MsgBox() {
  const dispatch = useAppDispatch();
  const blocks = useAppSelector((state) => state.msgbox.blocks);

  function removeBlock(index: number) {
    const deleteBlock = blocks.filter((_element, i) => i !== index);
    dispatch(setBlocks(deleteBlock));
  }

  return blocks.map((i, index) => (
    <Draggable handle="#TopBar">
      <div
        className="Window active"
        style={{
          width: !i.width ? "440px" : i.width,
          top: `${index * 30}px`,
          left: `${index * 25}px`,
        }}
      >
        <TopBar title={i.topBarTitle}>
          <TopBarInteraction
            action="close"
            onClose={() => removeBlock(index)}
          />
        </TopBar>
        <WindowBodyDefault
          type={i.type}
          icon={i.icon}
          title={i.title}
          content={i.content}
        >
          <WindowBodyButton>
            {i.buttons.map((j) => (
              <div
                className="Button"
                onClick={() => removeBlock(index)}
                onMouseUp={j.action}
              >
                {j.label}
              </div>
            ))}
          </WindowBodyButton>
        </WindowBodyDefault>
      </div>
    </Draggable>
  ));
}
