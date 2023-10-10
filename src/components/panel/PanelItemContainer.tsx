import "./Panel.scss";

interface PanelContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function PanelContainer({ children }: PanelContainerProps) {
  return <div className="PanelContainer">{children}</div>;
}
