import "./Window.scss";
import { useAppSelector } from "@/store/hooks";

interface WindowBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function WindowBody({ children, ...props }: WindowBodyProps) {
  const shellTheme = useAppSelector((state) => state.shell.theme);
  return (
    <div
      className={`WindowBody ${shellTheme === "WhiteSur" ? "whitesur" : ""}`}
      {...props}
    >
      {children}
    </div>
  );
}
