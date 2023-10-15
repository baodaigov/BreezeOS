import { useEffect, useRef } from "react";
import "./TerminalDesktop.scss";
import { useAppSelector } from "@/store/hooks";

export default function TerminalWindow() {
  const array = useAppSelector((state) => state.shutdown.elem);
  const terminalWindowRef = useRef<HTMLDivElement>(null);
  const isActive = useAppSelector((state) => state.terminalwindow.active);

  useEffect(() => {
    const current = terminalWindowRef.current;
    current?.scrollIntoView(true);
  }, []);

  return (
    <div
      className={`TerminalWindow ${isActive && "active"}`}
      ref={terminalWindowRef}
    >
      {array}
    </div>
  );
}
