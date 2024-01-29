import "./Window.scss";
import { useAppSelector } from "@/store/hooks";

interface WindowBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function WindowBody({ children, ...props }: WindowBodyProps) {
  const shellTheme = useAppSelector((state) => state.shell.theme);
  const fullscreen = useAppSelector((state) => state.apps.fullscreen);
  return (
    <div
      className={`WindowBody ${shellTheme === "WhiteSur" ? "whitesur" : ""} ${
        fullscreen && "expand"
      }`}
      {...props}
    >
      {children}
    </div>
  );
}
