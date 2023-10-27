import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setModalContent } from "@/store/reducers/modal";
import { useEffect, useState } from "react";
import "./Modal.scss";

export default function Modal() {
  const dispatch = useAppDispatch();
  const content = useAppSelector((state) => state.modal.content);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (content) {
      setIsActive(true);
      setTimeout(() => {
        setIsActive(false);
        setTimeout(() => dispatch(setModalContent("")), 3000);
      }, 3000);
    }
  }, [content]);

  return (
    <div className="ModalWrapper">
      <div className={`ModalContainer ${isActive && "active"}`}>
        <p>{content}</p>
      </div>
    </div>
  );
}
